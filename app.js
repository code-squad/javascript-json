const Node = require('./node');
const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const keyword = require('./keyword');

class Parser {
  constructor({ lexer, tokens }) {
    this.lexer = lexer;
    this.queue = tokens;
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

  parse() {
    const word = this.queue.shift();
    if (word === '[') {
      const root = new Node({ type: 'Array' });
      const parsedTree = this.arrayParse(root);
      return parsedTree;
    }
  }
}

const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const tokenizer = new Tokenizer({ rawString: str });
const lexer = new Lexer({ keyword });
const parser = new Parser({ lexer, tokens: tokenizer.tokenize() });

const result = parser.parse();
console.log(JSON.stringify(result, null, 2));
