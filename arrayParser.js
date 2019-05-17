const tokenize = require('./tokenizer');
const lex = require('./lexer');
const parse = require('./parser');

const arrayParser = input => {
  return parse(tokenize(input).map(v => lex(v)));
};

// test case
const caseRight1 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const caseWrong1 = "['1a'3',[22,23,[11,[112233],112],55],33]";
const caseWrong2 = "['1a3',[22,23,[11,[112233],112],55],3d3]";

console.dir(arrayParser(caseRight1));
console.dir(arrayParser(caseWrong1));
console.dir(arrayParser(caseWrong2));
