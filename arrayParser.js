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
        const lexer = new Lexer();
        const parser = new Parser();

        const tokenizedList = tokenizer.tokenizing();
        const lexedList = lexer.lexing(tokenizedList);
        const parsedList = parser.parsing(lexedList);
        console.log(JSON.stringify(parsedList, null, 2));
    }
}

module.exports = ArrayParser;