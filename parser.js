class Parser {
  constructor() {
    this.tokenStack = [];
  }

  checkTypeExceptArray(InputType) {
    const typeArr = ["string", "number", "boolean", "null", "object-key"];
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

  checkParentTokenisObj(currentParentToken) {
    if (currentParentToken._type === "object") {
      if (currentParentToken._child.length > 0) {
        if (
          currentParentToken._child[currentParentToken._child.length - 1]
            ._type == "object-key"
        ) {
          return true;
        }
      }
    }
  }

  updateTokenStack(currentChildToken) {
    const currentParentToken = this.findParentToken();

    if (this.checkParentTokenisObj(currentParentToken)) {
      currentParentToken._child[currentParentToken._child.length - 1]._value =
        currentChildToken._value;
      currentParentToken._child[currentParentToken._child.length - 1]._type =
        currentChildToken._type;

      this.pushParentToken(currentParentToken);
    } else {
      const updateParentToken = this.addChildTokenToParentToken(
        currentParentToken,
        currentChildToken
      );
      this.pushParentToken(updateParentToken);
    }
  }

  // updateObjTokenStack(currentChildToken) {
  //   const currentParentToken = this.findParentToken();
  //   currentParentToken._key = currentChildToken._key;
  //   const updateParentToken = currentParentToken;
  //   this.pushParentToken(updateParentToken);
  // }

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
      if (token._type === "array" || token._type === "object") {
        this.tokenStack.push(token);
      } else if (this.checkTypeExceptArray(token._type)) {
        this.updateTokenStack(token);
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
    });
    return result;
  }
}

module.exports = Parser;
