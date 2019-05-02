const Node = require('./node');

const tokenizer = {
  removeWhiteSpace: str => str.replace(/\s/g, ''),

  tokenize(str) {
    strWithoutSpace = this.removeWhiteSpace(str);
    return strWithoutSpace.split(/([\[\]])|,/).filter(Boolean);
  }
};

const lexer = {
  lex: word => {
    if (word === '[') {
      return 'node';
    }

    if (word === ']') {
      return 'end';
    }

    return 'element';
  }
};

class Parser {
  constructor({ tokenizer, lexer }) {
    this.lexer = lexer;
    this.tokenizer = tokenizer;
    this.queue = [];
  }

  makeNode(element) {
    element = Number(element);
    return new Node({
      type: 'number',
      value: element
    });
  }

  arrayParse(node) {
    while (this.queue.length !== 0) {
      const word = this.queue.shift();
      const context = this.lexer.lex(word);

      if (context === 'node') {
        const newNode = new Node({ type: 'Array' });
        node.pushChild(this.arrayParse(newNode));
        continue;
      }

      if (context === 'element') {
        node.pushChild(this.makeNode(word));
        continue;
      }

      return node;
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

const str = '[123, [22, 33], 444]';
const str2 = '[123, 22, 33, 444]';

const parser = new Parser({ lexer, tokenizer });
const result = parser.parse(str);
console.log(JSON.stringify(result, null, 2));

console.log('======================================');

const result2 = parser.parse(str2);
console.log(JSON.stringify(result2, null, 2));
