const tokenize = require('./tokenizer');
const makeLexedToken = require('./lexer');
const parse = require('./parser');

const arrayParser = input => {
  return parse({ lexedQueue: tokenize(input).reduce(makeLexedToken, []) });
};

// test case
const caseRight1 =
  "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";

const result = arrayParser(caseRight1);
console.log(JSON.stringify(result, null, 2));
