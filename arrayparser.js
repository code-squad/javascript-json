const Tokenizer = require("./tokenizer");
const Lexer = require("./lexer");
const Parser = require("./parser");

class ArrayParser {
  constructor(tokenizer, lexer, parser) {
    this.tokenizer = tokenizer;
    this.lexer = lexer;
    this.parser = parser;
  }

  startParsing(inputStr) {
    // 1. tokenizer
    inputStr = this.tokenizer.addCommaToBraket(inputStr);
    inputStr = this.tokenizer.addCommaToBrace(inputStr);
    inputStr = this.tokenizer.addCommaToColon(inputStr);

    inputStr = this.tokenizer.removeWhiteSpace(inputStr);
    const tokenizeredData = this.tokenizer.splitInputStr(inputStr);

    // 2. lexer
    const lexeredData = this.lexer.makeToken(tokenizeredData);

    // 3. parse
    const parseredData = this.parser.parsing(lexeredData);
    return parseredData;
  }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const parser = new Parser();
const arrayParser = new ArrayParser(tokenizer, lexer, parser);

const targetStr =
  "['1a3',[null,false,['11',[112233],{easy: ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

const result = arrayParser.startParsing(targetStr);

console.log(result);
console.log("=======");
console.log(JSON.stringify(result, null, 2));
