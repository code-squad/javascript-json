const Tokenizer = require('./tokenizer6-2');
const Lexer = require('./lexer6-2');

class ArrayParser {

    constructor(obj) {
        this.tokenizer = obj.tokenizer;
        this.lexer = obj.lexer;
        this.stack = [];
    }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser({ tokenizer, lexer });