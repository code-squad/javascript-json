class Parser {
  constructor() {
    this.tokenStack = [];
    this.result;
  }

  completeCondition() {
    return this.tokenStack.length === 0;
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
      } else if (
        token._type === "number" ||
        token._type === "string" ||
        token._type === "boolean" ||
        token._type === "null"
      ) {
        this.updateTokenStack(token);
      } else if (token._type === "array-end") {
        topToken = this.findParentToken();

        if (this.completeCondition()) {
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
