const Stack = require("./stack.js");
const tokenizer = require("./tokenizer.js");
const lexer = require("./lexer.js");

class Data {
  constructor(type, value, child = []) {
    this.type = type;
    this.value = value;
    this.child = child;
  }
}

function arrayParser(str) {
  const stack = new Stack();
  const tokens = tokenizer(str);
  const lexemes = lexer(tokens);

  let tempData = '';
  let parsedData;


  for (let lexeme of lexemes) {
    const type = lexeme.type;
    const value = lexeme.value;

    if (type === 'array' || type === 'object') {
      stack.push(new Data(type, value));
    }
    else if (type === 'arrayClose' || type === 'objectClose') {
      const top = stack.peek();
      if (tempData) top.child.push(tempData);
      tempData = '';
      parsedData = stack.pop();

      stack.top ? stack.peek().child.push(parsedData) : '';
    }
    else if (type === 'comma') {
      const top = stack.peek();
      if (tempData) top.child.push(tempData);
      tempData = '';
    }
    else {
      tempData = new Data(type, value, '');
    }
  }
  return parsedData;
};

/*
Test Case
*/
const str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]"
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));
