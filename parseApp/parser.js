const Node = require('./node');

class Parser {
  constructor({ lexedData }) {
    this.lexedData = lexedData;
    // this.parseStack = [];
  }

  // pushStack(keyword) {
  //   this.parseStack.push(keyword);
  // }

  arrayParse(node) {
    while (true) {
      const lexedToken = this.lexedData.shift();

      if (lexedToken.context === 'ArrayClose') {
        return node;
      }

      if (lexedToken.context === 'ArrayOpen') {
        lexedToken.newNode = this.arrayParse(lexedToken.newNode);
      }

      if (lexedToken.context === 'ObjectOpen') {
        lexedToken.newNode = this.objectParse(lexedToken.newNode);
      }

      node.pushChild(lexedToken.newNode);
    }
  }

  objectParse(node) {
    while (true) {
      const lexedToken = this.lexedData.shift();

      if (lexedToken.context === 'ObjectClose') {
        return node;
      }

      if (lexedToken.context === 'ObjectOpen') {
        lexedToken.newNode = this.objectParse(lexedToken.newNode);
      }

      if (lexedToken.context === 'ArrayOpen') {
        lexedToken.newNode = this.objectParse(lexedToken.newNode);
      }

      node.pushChild(lexedToken.newNode);
    }
  }

  parse() {
    const lexedToken = this.lexedData.shift();
    const root = new Node({ type: lexedToken.type });

    if (lexedToken.context === 'ArrayOpen') {
      // this.pushStack('[');
      const parsedTree = this.arrayParse(root);
      return parsedTree;
    }

    if (lexedToken.context === 'ObjectOpen') {
      // this.pushStack('{');
      const parsedTree = this.objectParse(root);
      return parsedTree;
    }
  }
}

module.exports = Parser;
