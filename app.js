const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ArrayParser = require('./arrayParser');
const rl = readline.createInterface(
  { input: fs.createReadStream(path.join(__dirname, './testcase/test1.in')),
  }
  );

rl.on('line', line => {
  try{
    const arrayParser = new ArrayParser(line);
    const result = arrayParser.analysis();
    console.log(JSON.stringify(result, null, 4));
  } catch(error){
    console.error(`Error: ${error.message}`);
  }
});
