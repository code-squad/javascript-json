const ArrayParser = require('./arrayParser.js');

const testCase = [
    "[-123.123, 2]",
    "[1,2,3,4,5]",
    "[-123123, 123, 234]",
    "   [ 234,  123, 234  ]",
    "[1,[2, 234, [234]]]",
    "[-123.123, [234, [234,[234],[234]]]]",
    "[123, 2342, [], [], [[2], 3]]",
    "[]",
    "[[][][]]",
    "[asdfasdf]",
    "[]]",
]

testCase.forEach((str) => {
    const arrayParser = new ArrayParser(str);
    console.log(arrayParser.tokenizer());
})
testCase.forEach((str) => {
    const arrayParser = new ArrayParser(str);
    console.log(arrayParser.lexer());
})
testCase.forEach((str) => {
    const arrayParser = new ArrayParser(str);
    console.log(JSON.stringify(arrayParser.parser(), null, 4));
})