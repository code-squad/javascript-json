const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const ArrayParser = require('./arrayParser');

const text = `['1a3', [null, false, ['11', [ 112233 ] , 112 ], 55 , '99'], 33, true]`

const tokenizer = new Tokenizer(text);
const lexer = new Lexer(tokenizer);
const arrayParser = new ArrayParser(lexer);


const result = arrayParser.analysis();

console.dir(result, {depth: null, });