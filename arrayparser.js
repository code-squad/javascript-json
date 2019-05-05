const Tokenizer = require("./tokenizer");
const Lexer = require("./lexer");
const Parser = require("./parser");

class ArrayParser {
  constructor(tokenizer, lexer, parser) {
    this.tokenizer = tokenizer;
    this.lexer = lexer;
    this.parser = parser;

    this.tokenizeredData;
    this.lexeredData;
    this.parseredData;
  }

  startParsing(inputStr) {
    // 1. tokenizer
    inputStr = this.tokenizer.addCommaToBraket(inputStr);
    inputStr = this.tokenizer.removeWhiteSpace(inputStr);
    this.tokenizeredData = this.tokenizer.splitInputStr(inputStr);
    // console.log(this.tokenizeredData);

    // 2. lexer
    this.lexeredData = this.lexer.makeToken(this.tokenizeredData);
    // console.log(this.lexeredData);

    // 3. parse
    this.parseredData = this.parser.parsing(this.lexeredData);
    return this.parseredData;
  }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const parser = new Parser();
const arrayParser = new ArrayParser(tokenizer, lexer, parser);

const targetStr = "[123, 22, 33]";
// const targetStr = "[123, 22, [33]]";
// arrayParser.startParsing(targetStr);
const result = arrayParser.startParsing(targetStr);

console.log(result);
console.log("=======");
console.log(JSON.stringify(result));

// const targetStr = "[123, 22, [33]]";
// console.log(result);
// console.log("=======");
// console.log(JSON.stringify(result));

// const targetStr = "['123',[ '456', '789',['11',['22']],'55', '99'], '33']";
