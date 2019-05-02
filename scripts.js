import { strict } from "assert";

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
  const parsedLetters = [];
  const arraySetters = ["[", "]"];
  const seperators = [",", " "]
  // const numberSetter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  // const stringSetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  
  splitLetters.reduce( (acc, cur) => {
    if(arraySetters.includes(cur)) {
      return "";
    }
    if(seperators.includes(acc)) {
      return cur;
    } else {
      if(seperators.includes(cur)) {
        parsedLetters.push(acc)
        return cur;
      } else {
        return acc+cur;
      }
    }
  },"");
  return parsedLetters;
}

const parser = (inputString) => {
  const lexedItem = lexer(inputString);
  const numberSetter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const result = lexedItem.map( letter => {
    for(let i = 0; i < letter.length; i++) {
      if(!numberSetter.includes(letter)) {
        return letter;
      } else {
        return Number(letter);
      }
    }
  })
  print(result);
}

const print = () => {
  
}

console.log(lexer("[123, 123, 123, 123]"))
//"[123, 123, 123, 123]"