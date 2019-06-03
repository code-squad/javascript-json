const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const Parser = require('./parser');

class ArrayParser {
    constructor(defaultStr = "") {
        this.inputStr = defaultStr;
    }

    getString(inputString) {
        this.inputStr = inputString;
    }

    runApp() {
        const tokenizer = new Tokenizer(this.inputStr);
        const tokenizedList = tokenizer.tokenizing();
        const lexer = new Lexer(tokenizedList);
        const lexedList = lexer.lexing();
        const parser = new Parser(lexedList);
        const parsedList = parser.parsing();
        console.log(JSON.stringify(parsedList, null, 2));
    }
}

module.exports = ArrayParser;