const Token = require("./token.js");

class ArrayParser {
  removeWhiteSpace(inputStr) {
    inputStr = inputStr.replace(/\s/g, "");
    return inputStr;
  }

  tokenizer(inputStr) {
    const splitedStr = inputStr.split(",");
    console.log(splitedStr);
    splitedStr.forEach(element => {
      for (let char of element) {
        if (char === "[") {
          this.lexer(char);
          element = element.replace(char, "");
        } else if (char === "]") {
          element = element.replace(char, "");
        }
      }
      this.lexer(element);
    });
  }

  lexer(token) {
    if (token === "[") {
      Token.prototype.tokenArr.push(new Token("array", "", []));
    } else {
      Token.prototype.tokenArr.push(new Token("number", token, []));
    }
  }
}

const parser = new ArrayParser();
const tergetStr = parser.removeWhiteSpace("[123, 22, 33]");
parser.tokenizer(tergetStr);
console.log(Token.prototype.tokenArr);
