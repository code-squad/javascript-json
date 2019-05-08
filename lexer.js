const Token = require("./token.js");

class Lexer {
  constructor() {
    this.lexeredData = [];
  }

  isArray(element) {
    const firstChar = element[0];
    const lastChar = element[element.length - 1];
    if (firstChar === '"' || firstChar === "'") {
      if (lastChar === '"' || lastChar === "'") {
        return true;
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
        this.lexeredData.push(new Token("null", element));
      } else if (element === "true" || element === "false") {
        this.lexeredData.push(new Token("boolean", element));
      } else if (this.isArray(element)) {
        this.lexeredData.push(new Token("string", element));
      } else if (!isNaN(element)) {
        this.lexeredData.push(new Token("number", element));
      } else {
        console.log(`${element}는 알 수 없는 타입입니다.`);
      }
    });
    return this.lexeredData;
  }
}

module.exports = Lexer;
