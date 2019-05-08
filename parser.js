class Parser {
  constructor() {
    this.tokenStack = [];
    this.result;
  }

  completeCondition() {
    if (this.tokenStack.length === 0) return true;
  }

  findParentToken() {
    return this.tokenStack.pop();
  }

  addChildTokenToParentToken(currentParentToken, currentChildToken) {
    currentParentToken._child.push(currentChildToken);
    return currentParentToken;
  }

  pushParentToken(updateParentToken) {
    this.tokenStack.push(updateParentToken);
  }

  updateTokenStack(currentChildToken) {
    const currentParentToken = this.findParentToken();
    const updateParentToken = this.addChildTokenToParentToken(
      currentParentToken,
      currentChildToken
    );
    this.pushParentToken(updateParentToken);
  }

  parsing(lexeredData) {
    let topToken;

    lexeredData.forEach((token, index) => {
      if (token._type === "array") {
        this.tokenStack.push(token);
      } else if (token._type === "number") {
        this.updateTokenStack(token);
      } else if (token._type === "array-end") {
        topToken = this.tokenStack.pop();

        if (this.completeCondition) {
          this.result = topToken;
        } else {
          this.updateTokenStack(topToken);
        }
      }
    });
    return this.result;
  }
}

module.exports = Parser;
