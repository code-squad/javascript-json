const Node = require('./node');

class Parser {
  constructor({ lexedData }) {
    this.lexedData = lexedData;
    // this.parseStack = [];
  }

  isOpeningContext(context) {
    return context === 'ArrayOpen' || context === 'ObjectOpen';
  }

  arrayParse(node) {
    // 닫는 것 없으면 무한루프지 않을까? todo
    while (true) {
      const lexedToken = this.lexedData.shift();

      if (lexedToken.context === 'ArrayClose') {
        return node;
      }

      if (this.isOpeningContext(lexedToken.context)) {
        lexedToken.newNode = this.parse(lexedToken);
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

      if (this.isOpeningContext(lexedToken.context)) {
        lexedToken.newNode = this.parse(lexedToken);
      }

      node.pushChild(lexedToken.newNode);
    }
  }

  parse(lexedToken = undefined) {
    if (lexedToken === undefined) {
      lexedToken = this.lexedData.shift();
    }

    if (this.isOpeningContext(lexedToken.context)) {
      // this.parseStack.push(lexedToken.context);

      if (lexedToken.context === 'ArrayOpen') {
        return this.arrayParse(lexedToken.newNode);
      }

      if (lexedToken.context === 'ObjectOpen') {
        return this.objectParse(lexedToken.newNode);
      }
    }
  }
}

module.exports = Parser;
