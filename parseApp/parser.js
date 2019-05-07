const Node = require('./node');

class Parser {
  constructor({ lexedData }) {
    this.lexedData = lexedData;
  }

  arrayParse(node) {
    while (this.lexedData.length !== 0) {
      const lexedToken = this.lexedData.shift();

      if (lexedToken.context === 'ArrayClose') {
        return node;
      }

      if (lexedToken.context === 'ArrayOpen') {
        lexedToken.newNode = this.arrayParse(lexedToken.newNode);
      }

      node.pushChild(lexedToken.newNode);
    }

    return node;
  }

  parse() {
    const lexedData = this.lexedData.shift();
    if (lexedData.context === 'ArrayOpen') {
      const root = new Node({ type: 'Array' });
      const parsedTree = this.arrayParse(root);
      return parsedTree;
    }
  }
}

module.exports = Parser;
