const Token = require("./token.js");

class Lexer {
  constructor() {
    this.lexeredData = [];
  }
  makeToken(tokenizeredData) {
    tokenizeredData.forEach(element => {
      if (element[0] === "[") {
        this.lexeredData.push(new Token("array"));
      } else if (element[0] === "]") {
        this.lexeredData.push(new Token("array-end"));
      } else {
        this.lexeredData.push(new Token("number", element));
      }
    });
    return this.lexeredData;
  }
}

module.exports = Lexer;
