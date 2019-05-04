const tokenize = require('./tokenizer');
const lex = require('./lexer');
const parse = require('./parser');

const arrayParser = (input) => {
    const lexedtokens = tokenize(input).map(v => lex(v))
    const rootNode = lexedtokens.shift();
    parse(rootNode, lexedtokens); 
    return rootNode;
}

console.dir(arrayParser("['1a3',[null,false,['11',[112233],112],55, '99'],33, true]") )