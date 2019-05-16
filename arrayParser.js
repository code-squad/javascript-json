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
        // console.log(tokenizedList);
        const parsedList = parser.parsing(lexedList)
        console.log(JSON.stringify(parsedList, null, 2));
    }
}

module.exports = ArrayParser;

// arrayParser("['asd',[null,false,['11',[112233],112],55, '99'],33, true]");

// const arrayParser = inputString => {
//     const tokenizer = new Tokenizer(inputString);
//     const lexer = new Lexer();
//     const tokenizedList = tokenizer.tokenizing();
//     const lexedList = lexer.lexing(tokenizedList);

//     return (function() {
//         console.log(lexedList);
//     })()
// }