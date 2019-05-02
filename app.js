const Node = require('./node');

const tokenizer = {
  removeWhiteSpace: str => str.replace(/\s/g, ''),
  tokenize: str => str.split(/([\[\]])|,/).filter(Boolean)
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
  constructor({ queue, lexer }) {
    this.lexer = lexer;
    this.queue = queue;
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

  parse() {
    const word = this.queue.shift();
    if (word === '[') {
      const root = new Node({ type: 'Array' });
      this.arrayParse(root);
      return root;
    }
  }
}

let str = '[123, [22, 33], 444]';
str = tokenizer.removeWhiteSpace(str);
const tokens = tokenizer.tokenize(str);

const parser = new Parser({ queue: tokens, lexer });
const result = parser.parse();
console.log(JSON.stringify(result, null, 2));
