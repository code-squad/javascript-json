class Parser {
  constructor({ lexedData, keyword, messageObj }) {
    this.lexedData = lexedData;
    this.keyword = keyword;
    this.messageObj = messageObj;
    this.parseStack = [];
  }

  isOpeningContext(context) {
    return context === this.keyword['['].context || context === this.keyword['{'].context;
  }

  isClosingContext(context) {
    return context === this.keyword[']'].context || context === this.keyword['}'].context;
  }

  isValidPair(currentContext) {
    const pairContext = this.parseStack[this.parseStack.length - 1];

    if (currentContext === this.keyword[']'].context && pairContext === this.keyword['['].context) {
      return true;
    }

    if (currentContext === this.keyword['}'].context && pairContext === this.keyword['{'].context) {
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
          throw new Error(this.messageObj.INVALID_ARRAY);
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
          throw new Error(this.messageObj.INVALID_OBJECT);
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

      if (lexedToken.context === this.keyword['['].context) {
        return this.arrayParse(lexedToken.newNode);
      }

      if (lexedToken.context === this.keyword['{'].context) {
        return this.objectParse(lexedToken.newNode);
      }
    }
  }
}

module.exports = Parser;
