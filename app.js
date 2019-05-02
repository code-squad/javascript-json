const Node = require('./node');

const tokenizer = {
  removeWhiteSpace: str => str.replace(/\s/g, ''),
  tokenize: str => str.split(/([\[\]])|,/).filter(Boolean)
};

let str = '[123, [22, 33], 444]';
str = tokenizer.removeWhiteSpace(str);
const tokens = tokenizer.tokenize(str);
console.log(tokens);
