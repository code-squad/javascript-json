const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const Stack = require('./stack');
const ErrorChecker = require('./errorChecker');
const ArrayParser = require('./arrayParser');
const Analyst = require('./analyst');

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const stack = new Stack();
const errorChecker = new ErrorChecker();
const arrayParser = new ArrayParser({ tokenizer, lexer, errorChecker, stack });
const analyst = new Analyst();

const str = "[ '123', {easy : ['he llo', {a:'a', b: null}, true] } , { a :123, a:'str', b:[ 912,[5656,33], {key : 'innervalue', newkeys: [1,2,3,4,5]} ] } ]";

const result = arrayParser.getParseTree(str);
console.log(JSON.stringify(result, null, 2));
analyst.run(result);
