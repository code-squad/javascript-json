const Token = require("./token.js");

class Lexer {
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
    const lexeredData = [];
    tokenizeredData.forEach(element => {
      if (element === "[") {
        lexeredData.push(new Token({ type: "array" }));
      } else if (element === "]") {
        lexeredData.push(new Token({ type: "array-end" }));
      } else if (element === "null") {
        lexeredData.push(new Token({ type: "null" }));
      } else if (element === "true" || element === "false") {
        lexeredData.push(new Token({ type: "boolean", value: element }));
      } else if (this.isStr(element)) {
        lexeredData.push(new Token({ type: "string", value: element }));
      } else if (isFinite(element)) {
        lexeredData.push(new Token({ type: "number", value: element }));
      } else {
        throw new Error(`${element}는 알 수 없는 타입의 토큰입니다.`);
      }
    });
    return lexeredData;
  }
}

module.exports = Lexer;
