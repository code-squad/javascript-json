const Token = require("./token.js");

class ArrayParser {
  removeWhiteSpace(inputStr) {
    inputStr = inputStr.replace(/\s/g, "");
    return inputStr;
  }

  tokenizer(inputStr) {
    const splitedStr = inputStr.split(",");

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

  parse() {
    const parentToken = Token.prototype.tokenArr.find(
      token => token._type === "array"
    );

    Token.prototype.tokenArr.forEach(token => {
      if (token._type === "number") {
        parentToken._child.push(token);
      }
    });
    return parentToken;
  }
}

const arrayParser = new ArrayParser();
const tergetStr = arrayParser.removeWhiteSpace("[123, 22, 33]");

arrayParser.tokenizer(tergetStr);
const afterParsingData = arrayParser.parse();
console.log(afterParsingData);
