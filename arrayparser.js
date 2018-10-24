const Stack = require("./stack.js");
const tokenizer = require("./tokenizer.js");

function arrayParser() {
  const stack = new Stack();
  function parser(tokens) {
    let dataValue = '';
    let parsedData;

    for (let token of tokens) {
      if (token.match(/\[/)) {
        stack.push(new Data("array", "ArrayObject"));
      }
      else if (token.match(/,|\]/)) {
        if (dataValue) pushLexerToTop(lexer(dataValue));
        dataValue = '';
        if (token === ']') parsedData = stack.concat();
      }
      else {
        dataValue += token;
      }
    }
    return dataValue ? new Data("number", Number(dataValue)) : parsedData;
  }

  function pushLexerToTop(lexerData) {
    const topChild = stack.peek().child;
    topChild.push(lexerData);
  }

  return (str) => {
    const tokens = tokenizer(str);
    return parser(tokens);
  }
};

/*
Test Case
*/
const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));