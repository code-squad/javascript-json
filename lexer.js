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
            return true;
        }
        return false;
    }

}
module.exports = Lexer;