class Parser {
  constructor() {
    this.tokenStack = [];
  }

  checkTypeExceptArray(InputType) {
    const typeArr = ["string", "number", "boolean", "null"];
    return typeArr.includes(InputType);
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
    console.log(currentChildToken);
    console.log(currentParentToken);
    if (currentParentToken._type === "object") {
      currentParentToken._value = currentChildToken._value;
      this.pushParentToken(currentParentToken);
    } else {
      const updateParentToken = this.addChildTokenToParentToken(
        currentParentToken,
        currentChildToken
      );
      console.log(updateParentToken);
      this.pushParentToken(updateParentToken);
    }
  }

  updateObjTokenStack(currentChildToken) {
    const currentParentToken = this.findParentToken();
    console.log(currentChildToken);
    console.log(currentParentToken);
    currentParentToken._key = currentChildToken._key;
    const updateParentToken = currentParentToken;
    // console.log("=============");
    console.log(updateParentToken);
    this.pushParentToken(updateParentToken);
  }

  updateObjEndToken() {
    const currentChildToken = this.findParentToken();
    const currentParentToken = this.findParentToken();

    const updateParentToken = this.addChildTokenToParentToken(
      currentParentToken,
      currentChildToken
    );
    this.pushParentToken(updateParentToken);
  }

  parsing(lexeredData) {
    let topToken;
    let result;

    lexeredData.forEach((token, index) => {
      // console.log(token);
      if (token._type === "array" || token._type === "object") {
        this.tokenStack.push(token);
      } else if (this.checkTypeExceptArray(token._type)) {
        this.updateTokenStack(token);
      } else if (token._type === "object-key") {
        this.updateObjTokenStack(token);
      } else if (token._type === "object-end") {
        this.updateObjEndToken(token);
      } else if (token._type === "array-end") {
        topToken = this.findParentToken();

        if (this.completeCondition()) {
          result = topToken;
        } else {
          this.updateTokenStack(topToken);
        }
      }
      console.log(this.tokenStack);
      console.log("================");
    });
    return result;
  }
}

module.exports = Parser;
