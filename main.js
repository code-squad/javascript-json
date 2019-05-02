const arrayTokenizer = require("./arrayTokenizer");
const arrayParser = require("./arrayParser");

const str = "[123, 22, 33]";
const result = arrayTokenizer(str);
const printResult = arrayParser(result);
console.log(result);
console.log('\n');
console.log(printResult);

