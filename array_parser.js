const validation = require('./validation');
const Tokenizer = require('./tokenizer');
const Parser = require('./parser');
const Lexer = require('./lexer');

const ArrayParser = (strValue) => {
    const tokenizer = new Tokenizer();
    const lexer = new Lexer(validation);
    const parser = new Parser(tokenizer, lexer);
    parser.initTokenArrayVisited([1, 2, 3, 4]);
    parser.setVisit([1, 2, 3, 4], 3);
    console.log(parser.isVisited([1, 2, 3, 4], 3));
    console.log(parser.isVisited([1, 2, 3, 4], 2));
    console.log(parser.isVisited([1, 2, 3, 4], 4));
    console.log(parser.isVisited([1, 2, 3, 4], 1));
}

module.exports = ArrayParser;