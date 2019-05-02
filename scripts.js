// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


// const init = () => {
//   rl.question('분석할 JSON 데이터를 입력하세요. ', (answer) => {
//     rl.close();
//   });
// }

const lexer = (inputString) => {
  const splitLetters = inputString.split('');
  const lexedItems = [];
  const seperators = ["[", "]", ",", " "];
    
  splitLetters.reduce( (acc, cur) => {
    if(!seperators.includes(acc) && seperators.includes(cur)) lexedItems.push(acc);
    if(!seperators.includes(acc) && !seperators.includes(cur)) return acc+cur;
    return cur
  });
  return lexedItems;
}

const parser = (inputString) => {
  const lexedItem = lexer(inputString);
  const result = lexedItem.map( letter => {
    if(Number(letter) === NaN) {
      return letter;
    } else {
      return Number(letter);
    }
  })
  print(result);
}

const typeChecker = thingsToCheck => {
  if(Array.isArray(thingsToCheck)) return "array"
  return typeof thingsToCheck
}

const print = (lexedArray) => {
  const typeOfContainer = typeChecker(lexedArray);
  const result = {'type': typeOfContainer, 'child': []};

  lexedArray.forEach( elem => {
    const typeOfLetter = typeChecker(elem);
    const typeAndValue = {'type': typeOfLetter, 'value': elem}
    result.child.push(typeAndValue);
  })
  console.log(result);
}

parser("[123, 123, 123, 123]")
//"[123, 123, 123, 123]"