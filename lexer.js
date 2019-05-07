const Node = require('./Node');

class Lexer{
    lex(token){
        if(token === '['){
            return new Node('arrStart', '[');
        }
        if(token === ']'){
            return new Node('arrEnd', ']');
        }
        if(isFinite(Number(token))){
            return new Node('number', token);
        }
        if(token.startsWith("'") && token.endsWith("'")){
            return new Node('string', token);
        }
        if(token === 'null') {
            return new Node('null', token);
        }
        if(token === 'true' || token ==='false'){
            return new Node('boolean', token);
        }
        else {
            throw Error(`${token} undefined token type error`);
        }
    }
}

module.exports = Lexer;