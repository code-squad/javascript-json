const Token = require("./token.js");

class Lexer {
  constructor() {
    this.lexeredData = [];
  }

  isCorrectStr(element) {
    element = element.slice(1, element.length - 1);
    if (element.includes("'")) {
      return false;
    }
    return true;
  }

  isStr(element) {
    if (element.startsWith("'") && element.endsWith("'")) {
      if (this.isCorrectStr(element)) {
        return true;
      } else {
        throw new Error(`${element}는 올바르지 않은 문자열입니다.`);
      }
    }
  }

  makeToken(tokenizeredData) {
    tokenizeredData.forEach(element => {
      if (element === "[") {
        this.lexeredData.push(new Token("array"));
      } else if (element === "]") {
        this.lexeredData.push(new Token("array-end"));
      } else if (element === "null") {
        this.lexeredData.push(new Token("null"));
      } else if (element === "true" || element === "false") {
        this.lexeredData.push(new Token("boolean", element));
      } else if (this.isStr(element)) {
        this.lexeredData.push(new Token("string", element));
      } else if (isFinite(element)) {
        this.lexeredData.push(new Token("number", element));
      } else {
        throw new Error(`${element}는 알 수 없는 타입의 토큰입니다.`);
      }
    });
    return this.lexeredData;
  }
}

module.exports = Lexer;
