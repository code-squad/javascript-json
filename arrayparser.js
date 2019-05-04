const Token = require("./token.js");

class ArrayParser {
  constructor() {
    this.tokenArr = [];
  }

  tokenizer(inputStr) {
    inputStr = inputStr.replace(/\[/g, "[,");
    inputStr = inputStr.replace(/\]/g, ",]");
    inputStr = inputStr.replace(/\s/g, "");
    return inputStr.split(",");
  }

  lexer(tokenizeredData) {
    tokenizeredData.forEach(element => {
      if (element[0] === "[") {
        this.tokenArr.push(new Token("array"));
      } else if (element[0] === "]") {
      } else {
        this.tokenArr.push(new Token("number", element));
      }
    });

    return this.tokenArr;
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
    // 1. tokenizer
    const tokenizeredData = this.tokenizer(inputStr);
    console.log(tokenizeredData);

    // 2. lexer
    const lexeredData = this.lexer(tokenizeredData);
    console.log(lexeredData);

    // 3. parse

    const result = this.parse();
    return result;
  }
}

const targetStr = "[123, 22, 33]";
// const targetStr = "[123, 22, [33]]";

const arrayParser = new ArrayParser();
const result = arrayParser.startParsing(targetStr);
console.log(result);
console.log("=======");
console.log(JSON.stringify(result));
