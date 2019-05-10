const Tokenizer = require('./tokenizer.js')
const Parser = require('./parser.js')
const Lexer = require('./lexer.js')

const readline = require('readline')

const rl = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const parser = new Parser();

let tokens = [];

(() => {
  rl.question('tokenizer 사용자 입력 : ', (userInput) => {
    try {
      tokens = tokenizer.tokenize(userInput);
      console.table(tokens)
      tokens = tokens.map(token => lexer.lexValue(token))
      console.table(tokens)
      
      let result = parser.parseWithTokens(tokens);
      if (!parser.stackIsEmpty()) {
        throw new Error('대괄호의 갯수가 맞지 않습니다.')
      }
      if (parser.isInvalidCommas()){
        throw new Error('부적절한 콤마가 포함되어있습니다.')
      }
      result = result.child[0]
      console.log(JSON.stringify(result, null, 2)); 
      
    } catch (e) {
      console.log(e.message)
    }
    rl.close();
  });
})()