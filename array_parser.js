const validation = require('./validation');
const Tokenizer = require('./tokenizer');
const Parser = require('./parser');
const Lexer = require('./lexer');

const ArrayParser = (strValue) => {
    const tokenizer = new Tokenizer();
    const lexer = new Lexer(validation);
    const parser = new Parser(tokenizer, lexer);
    const tokenArray = [{ 'depth' : 1, 'value' : 13, 'type' : 'number', },
                        { 'depth' : 2, 'value' : 7, 'type' : 'number', },
                        { 'depth' : 3, 'value' : 53, 'type' : 'number', },
                        { 'depth' : 2, 'value' : 1233, 'type' : 'number', },
                        { 'depth' : 1, 'value' : 1356, 'type' : 'number', },];
    parser.initTokenArrayVisited(tokenArray);
    console.log(parser.makeNode(tokenArray, 1));
}

module.exports = ArrayParser;