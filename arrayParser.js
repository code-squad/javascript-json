const readline = require('readline')

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});



class ArrayParser{
  constructor(){

  }
  arrayParse(input){
    input = input.trim()
    if(input[0] === '[' && input[input.length-1] === ']'){
      let result = {type: 'array', child: []}
      let token = input.slice(1,input.length-1)
      
      const elements = token.split(',')
      elements.forEach(element => {
        result.child.push(this.arrayParse(element))
      });
      return result
    }
    if(!isNaN((input.trim())*1)){
      let result = {type: 'number', value: input.trim()}
      return result
    }
    throw new Error('Invalid Token')
  }
}

const arrayParser = new ArrayParser();

(() => {
  rl.question('ArrayParser 사용자 입력 : ', (userInput) => {
    try{
      let result = arrayParser.arrayParse(userInput)
      console.log(result)
    }catch(e){
      console.log(e.message)
    }
    rl.close();
  });
})()