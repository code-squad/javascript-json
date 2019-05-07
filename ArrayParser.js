const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const Node = require('./Node');

class ArrayParser {
    constructor({tokenizer, lexer}) {
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.queue = [];
    }

    parse(input) {
        const tokens = this.tokenizer.tokenize(input);
        tokens.forEach(token => this.queue.push(this.lexer.lex(token)));
        const firstNode = this.queue.shift();
    }
}

const str = '[123, 22, [0.0033, 123], -45, 0.6, 7.828, 6]';

const tokenizer = new Tokenizer;
const lexer = new Lexer;
const arrayParser = new ArrayParser;
const tokens = tokenizer.tokenize(str);
const lexedTokens = lexer.lex(tokens);
console.log(lexedTokens);
console.log(arrayParser.parse(lexedTokens));