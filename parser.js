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

  // 부모가 obj인지 검사하는 함수
  checkParentTokenisObj(currentParentToken) {
    // const childOfParentToken = currentParentToken._child;

    return currentParentToken._type === "object";
  }

  // 부모가 child로 obj-key를 가지고 있는 obj인지 검사하는 함수
  objHasObjectkey(currentParentToken) {
    if (currentParentToken.length > 0) {
      const childOfParentToken = currentParentToken._child;
      const lastTokenOfChild = childOfParentToken.length - 1;

      if (childOfParentToken[lastTokenOfChild]._type == "object-key") {
        return true;
      }
    }
  }

  // value가 배열인지 아닌지 검사하는 함수
  checkChildTokentype(currentChildToken) {
    const childOfChildToken = currentChildToken._child;

    if (childOfChildToken.length > 0) {
      // object의 value가 배열인경우
      return "array";
    }
  }

  updataObjParentToken(currentParentToken, currentChildToken) {
    const childOfParentToken = currentParentToken._child;
    const lastTokenOfChild = childOfParentToken.length - 1;

    if (checkChildTokentype(currentChildToken) === "array") {
      childOfParentToken[lastTokenOfChild]._child = currentChildToken._child;
    } else {
      // obj의 value가 number, string, boolean의 경우
      childOfParentToken[lastTokenOfChild]._value = currentChildToken._value;
    }
    childOfParentToken[lastTokenOfChild]._type = currentChildToken._type;

    this.pushParentToken(currentParentToken);
  }

  updateTokenStack(currentChildToken) {
    const currentParentToken = this.findParentToken();

    if (
      this.checkParentTokenisObj(currentParentToken) &&
      this.objHasObjectkey(currentParentToken)
    ) {
      this.updataObjParentToken(currentParentToken, currentChildToken);
    } else {
      const updateParentToken = this.addChildTokenToParentToken(
        currentParentToken,
        currentChildToken
      );
      this.pushParentToken(updateParentToken);
    }
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
