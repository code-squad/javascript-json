class Parser {
  constructor({ lexedData }) {
    this.lexedData = lexedData;
    this.parseStack = [];
  }

  isOpeningContext(context) {
    return context === 'ArrayOpen' || context === 'ObjectOpen';
  }

  isClosingContext(context) {
    return context === 'ArrayClose' || context === 'ObjectClose';
  }

  isValidPair(currentContext) {
    const pairContext = this.parseStack[this.parseStack.length - 1];

    if (currentContext === 'ArrayClose' && pairContext === 'ArrayOpen') {
      return true;
    }

    if (currentContext === 'ObjectClose' && pairContext === 'ObjectOpen') {
      return true;
    }

    return false;
  }

  arrayParse(node) {
    // 닫는 것 없으면 무한루프지 않을까? todo
    while (true) {
      const lexedToken = this.lexedData.shift();

      if (this.isClosingContext(lexedToken.context)) {
        if (!this.isValidPair(lexedToken.context)) {
          throw new Error('정상적으로 종료되지 않은 배열이 있습니다.');
        }

        this.parseStack.pop();

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

      if (this.isClosingContext(lexedToken.context)) {
        if (!this.isValidPair(lexedToken.context)) {
          throw new Error('정상적으로 종료되지 않은 객체가 있습니다.');
        }

        this.parseStack.pop();

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
      this.parseStack.push(lexedToken.context);

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
