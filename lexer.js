const Node = require('./node');

class Lexer {
    setType(token) {
        if (token === '[') {
            return new Node({ type: 'array', child: [] });
        }
        if (this.isString(token)) {
            return new Node({ type: 'string', value: token });
        }
        if (isFinite(token) && token !== null) {
            return new Node({ type: 'number', value: token });
        }
        if (token === 'true' || token === 'false') {
            return new Node({ type: 'boolean', value: token });
        }
        if (token === 'null') {
            return new Node({ type: 'null', value: null });
        }
        if (token === '{') {
            return new Node({ type: 'object', child: [] });
        }
        if (token.endsWith(':')) {
            return new Node({ type: 'key', key: token.slice(0, token.length - 1) });
        }
        if (token === ']' || token === '}') {
            return new Node({ type: 'end' });
        } else {
            return this.setErrorType(token);
        }
    }

    setErrorType(token) {
        if (token.includes(' ')) return new Node({ type: 'withSpace', value: token });
        else return new Node({ type: 'unknownType', value: token })
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