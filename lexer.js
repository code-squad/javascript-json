const Node = require('./Node');

class Lexer{
    lex(token){
        if(token === '[') return new Node('arrStart', '[');
        if(token === ']') return new Node('arrEnd', ']');

        if(Number(token)) return new Node('number', token);
        if (this.isString(token)) return new Node('string', token);
        
        if(token === 'null') return new Node('null', token);
        if(token === 'true' || token ==='false') return new Node('boolean', token);
        
        else throw Error(`${token} 은 알 수 없는 타입입니다.`);
    }

    isString(token){
        if (token.startsWith("'") || token.endsWith("'")) {
            const splitedTokenByQuote = token.split("'").filter(Boolean);
            if (splitedTokenByQuote.length === 1) return true;
            else throw Error (`${token}은 올바른 문자열이 아닙니다.`);
        }else return false;
    }
}

module.exports = Lexer;