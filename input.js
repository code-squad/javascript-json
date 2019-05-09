const Tokenizer = require('./tokenizer.js')
const Parser = require('./parser.js')
const readline = require('readline')

const rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

const tokenizer = new Tokenizer();
let tokens = [];

(() => {
  rl.question('tokenizer 사용자 입력 : ', (userInput) => {
    try {
      tokens = tokenizer.tokenize(userInput);
      console.table(tokens)
      const parser = new Parser(tokens);
      let result = parser.parseWithTokens();
      if (!parser.stackIsEmpty()) {
        throw new Error('대괄호의 갯수가 맞지 않습니다.')
      }
      result = result.child[0]
      console.log(JSON.stringify(result, null, 2)); 
      
    } catch (e) {
      console.log(e.message)
    }
    rl.close();
  });
})()