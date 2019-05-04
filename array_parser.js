const Parser = require('./parser');
const Lexer = require('./lexer');

const ArrayParser = (str) => {
    const lexer = new Lexer();
    const tokensInArray = lexer.getTokensInArray(str);
    const parser = new Parser(tokensInArray.length);
    return parser.createSyntaxTree(tokensInArray, 0);
}

module.exports = ArrayParser;