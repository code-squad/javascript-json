const readline = require('readline')

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

const main = () => {
  rl.question('ArrayParser 사용자 입력 : ', (userInput) => {
   
    console.log(userInput)

    rl.close();
  });
}

class ArrayParser{
  constructor(){

  }

}

const arrayParser = new ArrayParser()

main()