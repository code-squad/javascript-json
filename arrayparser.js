const Token = require("./token.js");

class ArrayParser {
  constructor() {
    this.tokenArr = [];
  }

  removeWhiteSpace(inputStr) {
    inputStr = inputStr.replace(/\s/g, "");
    return inputStr;
  }

  tokenizer(inputStr) {
    const splitedStr = inputStr.split(",");
    return splitedStr;
  }

  lexer(tokenizeredData) {
    tokenizeredData.forEach(element => {
      for (let char of element) {
        if (char === "[") {
          this.tokenArr.push(new Token("array", "", []));
          element = element.replace(char, "");
        } else if (char === "]") {
          element = element.replace(char, "");
        }
      }
      this.tokenArr.push(new Token("number", element, []));
    });
  }

  parse() {
    const parentToken = this.tokenArr.find(token => token._type === "array");

    this.tokenArr.forEach(token => {
      if (token._type === "number") {
        parentToken._child.push(token);
      }
    });
    return parentToken;
  }

  startParsing(inputStr) {
    // 1. removeWhiteSpace
    const spaceRemovedData = this.removeWhiteSpace(inputStr);

    // 2. tokenizer
    const tokenizeredData = this.tokenizer(spaceRemovedData);

    // 3. lexer
    this.lexer(tokenizeredData);

    // 4. parse

    const result = this.parse();
    return result;
  }
}

const targetStr = "[123, 22, 33]";
const arrayParser = new ArrayParser();
const result = arrayParser.startParsing(targetStr);
console.log(result);
