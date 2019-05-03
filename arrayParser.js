
const utils = require('./utils.js');

const tokenizer = (inputString) => {
  const splitLetters = inputString.split('');
  const tokenizedItems = [];
    
  splitLetters.reduce( (acc, cur) => {
    if(!utils.sepertorChecker(acc) && !utils.sepertorChecker(cur)) return acc+cur;
    if(!utils.sepertorChecker(acc) && utils.sepertorChecker(cur)) tokenizedItems.push(acc);
    if(cur === ']' || cur === '[') {
      tokenizedItems.push(cur);
    }
    return cur
  }, "");
  return tokenizedItems;
}

const lexer = (inputString) => {
  const tokenizedItems = tokenizer(inputString);
  const lexedItems = [];
  tokenizedItems.forEach( letter => {
    if(!utils.sepertorChecker(letter)) {
      const typeOfLetter = utils.typeChecker(letter);
      if(isNaN(Number(letter))) {
        lexedItems.push([typeOfLetter, letter])
      } else {
        lexedItems.push([typeOfLetter, Number(letter)])
      }
    }
  });
  return lexedItems;
}

const parser = (inputString) => {
  const lexedItems = lexer(inputString);
  const topnotch = {'type': 'Array', 'child': []};
  const parsedItems = lexedItems.map(lexedArr => {
    const [type, value] = lexedArr;
    return {type, value, child: []}
  })
  topnotch.child = parsedItems
  console.log(topnotch)
}

parser("[true, 123, null, 123, 123, undefined]")

// Test Case
//"[123, 123, 123, 123]"