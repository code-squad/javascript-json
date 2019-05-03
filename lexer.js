const Node = require('./node');

class Lexer {
    decideType(token) {
        if (token === '[') {
            return new Node('array');
        }
        if (this.isString(token)) {
            return new Node('string', token);
        }
        if (isFinite(token) && token !== null) {
            return new Node('number', token);
        }
        if (token === 'true' || token === 'false') {
            return new Node('boolean', token);
        }
        if (token === 'null') {
            return new Node('null');
        }
        if (token === ']') {
            return new Node('end');
        } else {
            throw Error(`${token}은 알수 없는 타입입니다.`);
        }
    }

    isString(token) {
        if (token.startsWith("'") && token.endsWith("'")) {
            const counts = this.countQuotes(token, "'");
            if (counts) throw Error(`${token}은 올바른 문자열이 아닙니다.`);
            return counts || true;
        }
        return false;
    }
    
    countQuotes(token, quote) {
        return token.slice(1, token.length - 1).split(quote).length - 1;
    }
}
module.exports = Lexer;