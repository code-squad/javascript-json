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

  let parsedData;

  for (let lexeme of lexemes) {
    const type = lexeme.type;

    if (type === 'array') {
      stack.push(new Data(type, lexeme.value));
    }
    else if (type === 'arrayClose') {
      parsedData = stack.pop();

      if (stack.top) stack.peek().child.push(parsedData);
    }
    else {
      const top = stack.peek();
      top.child.push(new Data(type, lexeme.value, ''));
    }
  }
  return parsedData;
};

/*
Test Case
*/
const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2)); 