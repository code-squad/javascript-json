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

  isSaperatorContext(context) {
    return context === this.keyword[','].context;
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

  isValidNextToken() {
    if (this.lexedData.length === 0) {
      return true;
    }

    const frontPeek = this.lexedData[0].context;

    if (this.isClosingContext(frontPeek)) {
      return true;
    }

    if (this.isSaperatorContext(frontPeek)) {
      this.lexedData.shift();
      return true;
    }

    return false;
  }

  arrayParse(node) {
    while (this.lexedData.length !== 0) {
      const lexedToken = this.lexedData.shift();

      if (this.isClosingContext(lexedToken.context)) {
        if (!this.isValidPair(lexedToken.context) || !this.isValidNextToken()) {
          throw new Error(this.messageObj.INVALID_ARRAY);
        }

        this.parseStack.pop();

        return node;
      }

      if (this.isOpeningContext(lexedToken.context)) {
        lexedToken.newNode = this.parse(lexedToken);
      } else {
        if (lexedToken.context === this.keyword[','].context) {
          throw new Error(this.messageObj.START_SEPERATOR);
        }

        if (!this.isValidNextToken()) {
          throw new Error(this.messageObj.INVALID_ARRAY);
        }
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
