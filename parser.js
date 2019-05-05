class Parser {
  constructor() {
    this.tokenStack = [];
    this.result;
  }

  findParentToken() {
    return this.tokenStack.pop();
  }

  addChildTokenToParentToken(currentParentToken, childToken) {
    currentParentToken._child.push(childToken);
    return currentParentToken;
  }

  pushParentToken(updateParentToken) {
    this.tokenStack.push(updateParentToken);
  }

  test(childToken) {
    const currentParentToken = this.findParentToken();
    const updateParentToken = this.addChildTokenToParentToken(
      currentParentToken,
      childToken
    );
    this.pushParentToken(updateParentToken);
  }

  parsing(lexeredData) {
    let currentParentToken;
    let currentChildToken;

    lexeredData.forEach((token, index) => {
      if (token._type === "array") {
        this.tokenStack.push(token);
      } else if (token._type === "number") {
        this.test(token);
      } else if (token._type === "array-end") {
        currentChildToken = this.tokenStack.pop();

        if (this.tokenStack.length === 0) {
          this.result = currentChildToken;
        }

        if (this.tokenStack.length > 0) {
          this.test(currentChildToken);
        }
      }
    });
    return this.result;
  }
}

module.exports = Parser;
