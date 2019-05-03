const checker = require('./typeCheckers')

const tokenizer = (inputString) => {
  const splitLetters = inputString.split('');
  const tokenizedItems = [];
  let data = "";
  splitLetters.forEach( letter => {
    if(letter === ",") {
      tokenizedItems.push(data);
      data = "";
    } else if(checker.sepertorChecker(letter)) {
      data !== "" ? tokenizedItems.push(data, letter) : tokenizedItems.push(letter)
    } else {
      data += letter;
    }
  }, "");
  return tokenizedItems;
}

const lexer = (inputString) => {
  const tokenizedItems = tokenizer(inputString);
  const lexedItems = [];
  tokenizedItems.forEach( letter => {
    if(!checker.sepertorChecker(letter)) {
      const typeOfLetter = checker.typeChecker(letter);
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