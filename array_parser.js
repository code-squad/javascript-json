const validation = require('./validation');
const Tokenizer = require('./tokenizer');
const Parser = require('./parser');
const Lexer = require('./lexer');

const ArrayParser = (strValue) => {
    const tokenizer = new Tokenizer();
    const lexer = new Lexer(validation);
    const parser = new Parser(tokenizer, lexer);
    console.log(parser.initTokenArrayVisited([{ 'depth' : 1, 'value' : 123, 'type' : 'number' },
                                                { 'depth' : 2, 'value' : 5, 'type' : 'number' },
                                                { 'depth' : 3, 'value' : 3, 'type' : 'number' },
                                                { 'depth' : 2, 'value' : 89, 'type' : 'number' },
                                                { 'depth' : 1, 'value' : 77, 'type' : 'number' },]))
}

module.exports = ArrayParser;