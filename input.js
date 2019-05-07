const ArrayParser = require('./arrayParser.js')
const readline = require('readline')

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

const arrayParser = new ArrayParser();

(() => {
  rl.question('ArrayParser 사용자 입력 : ', (userInput) => {
    try {
      // arrayParser.checkChars(userInput)
      let tokens = arrayParser.textTokenize(userInput)
      let result = arrayParser.parseWithTokens(tokens)

      console.log(result)
      //console.log(JSON.stringify(result, null, 2)); 
      
    } catch (e) {
      console.log(e.message)
    }
    rl.close();
  });
})()