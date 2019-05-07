const validation = require('./validation');
const Tokenizer = require('./tokenizer');
const Parser = require('./parser');
const Lexer = require('./lexer');

const ArrayParser = (strValue) => {
    const tokenizer = new Tokenizer();
    const lexer = new Lexer(validation);
    const parser = new Parser(tokenizer, lexer);
    parser.execute(strValue);    
}

module.exports = ArrayParser;