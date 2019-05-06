const Node = require('./node');

const tokenizer = {
  removeWhiteSpace: str => str.replace(/\s/g, ''),

  tokenize(str) {
    strWithoutSpace = this.removeWhiteSpace(str);
    return strWithoutSpace.split(/([\[\]])|,/).filter(Boolean);
  }
};

const lexer = {
  keyword: {
    '[': { context: 'ArrayOpen', type: 'Array' },
    ']': { context: 'ArrayClose', type: undefined },
    null: { context: 'Element', type: 'Null', value: null },
    true: { context: 'Element', type: 'Boolean', value: true },
    false: { context: 'Element', type: 'Boolean', value: false },
    undefined: { context: 'Element', type: 'Undefined', value: undefined }
  },

  makeNode(type, value) {
    return new Node({
      type: type,
      value: value
    });
  },

  isString(element) {
    return (
      element.startsWith("'") ||
      element.endsWith("'") ||
      element.startsWith('"') ||
      element.endsWith('"')
    );
  },

  lex(word) {
    if (this.keyword.hasOwnProperty(word)) {
      const { context, type, value } = this.keyword[word];

      if (word === ']') {
        return { context, newNode: undefined };
      }

      return { context, newNode: this.makeNode(type, value) };
    }

    if (this.isString(word)) {
      return {
        context: 'Element',
        newNode: this.makeNode('String', word.substring(1, word.length - 1))
      };
    }

    // if (Number.isNaN(Number(word))) 에러
    return { context: 'Element', newNode: this.makeNode('Number', Number(word)) };
  }
};

class Parser {
  constructor({ tokenizer, lexer }) {
    this.lexer = lexer;
    this.tokenizer = tokenizer;
    this.queue = [];
  }

  arrayParse(node) {
    while (this.queue.length !== 0) {
      const word = this.queue.shift();
      const lexedData = this.lexer.lex(word);

      if (lexedData.context === 'ArrayClose') {
        return node;
      }

      if (lexedData.context === 'ArrayOpen') {
        lexedData.newNode = this.arrayParse(lexedData.newNode);
      }

      node.pushChild(lexedData.newNode);
    }

    return node;
  }

  parse(str) {
    this.queue = tokenizer.tokenize(str);
    const word = this.queue.shift();
    if (word === '[') {
      const root = new Node({ type: 'Array' });
      const parsedTree = this.arrayParse(root);
      return parsedTree;
    }
  }
}

// const str = '[123, [22, 33], 444]';
// const str2 = '[123, 22, 33, 444]';

const parser = new Parser({ lexer, tokenizer });
// const result = parser.parse(str);
// console.log(JSON.stringify(result, null, 2));

// console.log('======================================');

// const result2 = parser.parse(str2);
// console.log(JSON.stringify(result2, null, 2));

const str3 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result3 = parser.parse(str3);
console.log(JSON.stringify(result3, null, 2));
