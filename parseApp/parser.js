class Parser {
  constructor({ lexedData, keyword, messageObj }) {
    this.lexedData = lexedData;
    this.keyword = keyword;
    this.messageObj = messageObj;
    this.parseStack = [];
  }

  getNextToken() {
    return this.lexedData.shift();
  }

  isOpeningContext(context) {
    return context === this.keyword['['].context || context === this.keyword['{'].context;
  }

  isClosingContext(context) {
    return context === this.keyword[']'].context || context === this.keyword['}'].context;
  }

  isSeperatorContext(context) {
    return context === this.keyword[','].context;
  }

  isObjectSeperatorContext(context) {
    return context === this.keyword[':'].context;
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

    if (this.isSeperatorContext(frontPeek)) {
      this.getNextToken();
      return true;
    }

    return false;
  }

  arrayParse(node) {
    while (this.lexedData.length !== 0) {
      const lexedToken = this.getNextToken();

      if (this.isClosingContext(lexedToken.context)) {
        if (!this.isValidPair(lexedToken.context) || !this.isValidNextToken()) {
          throw new Error(this.messageObj.INVALID_ARRAY);
        }

        this.parseStack.pop();

        return node;
      }

      if (this.isOpeningContext(lexedToken.context)) {
        lexedToken.newNode = this.parse(lexedToken);
        node.pushChild(lexedToken.newNode);
        continue;
      }

      if (lexedToken.context === this.keyword[','].context) {
        throw new Error(this.messageObj.START_SEPERATOR);
      }

      if (!this.isValidNextToken()) {
        throw new Error(this.messageObj.INVALID_ARRAY);
      }

      node.pushChild(lexedToken.newNode);
    }
  }

  objectParse(node) {
    while (this.lexedData.length !== 0) {
      const lexedToken = this.getNextToken();

      if (this.isClosingContext(lexedToken.context)) {
        if (!this.isValidPair(lexedToken.context) || !this.isValidNextToken()) {
          throw new Error(this.messageObj.INVALID_OBJECT);
        }

        this.parseStack.pop();

        return node;
      }

      if (this.isOpeningContext(lexedToken.context)) {
        lexedToken.newNode = this.parse(lexedToken);
        node.pushChild(lexedToken.newNode);
        continue;
      }

      lexedToken.newNode.context = 'key';
      this.passObjectSeperator();
      lexedToken.newNode.child.push(this.getValueNode());

      node.pushChild(lexedToken.newNode);
    }
  }

  passObjectSeperator() {
    if (!this.isObjectSeperatorContext(this.getNextToken().context)) {
      throw new Error(this.messageObj.INVALID_OBJECT);
    }
  }

  getValueNode() {
    const valueToken = this.getNextToken();
    valueToken.newNode.context = 'value';

    if (this.isOpeningContext(valueToken.context)) {
      valueToken.newNode = this.parse(valueToken);
    }

    if (!this.isValidNextToken()) {
      throw new Error(this.messageObj.INVALID_OBJECT);
    }
    return valueToken.newNode;
  }

  parse(lexedToken = undefined) {
    if (lexedToken === undefined) {
      lexedToken = this.getNextToken();
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
