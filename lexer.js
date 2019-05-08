const Node = require('./node');

class Lexer {
    setType(token) {
        if (this.isOpenArray(token)) return new Node({ type: 'array', child: [] });
        if (this.isString(token)) return new Node({ type: 'string', value: token });
        if (isFinite(token)) return new Node({ type: 'number', value: token });
        if (this.isBoolean(token)) return new Node({ type: 'boolean', value: token });
        if (this.isNull(token)) return new Node({ type: 'null', value: null });
        if (this.isOpenObject(token)) return new Node({ type: 'object', child: [] });
        if (this.isObjectKey(token)) return new Node({ type: 'key', key: token.slice(0, token.length - 1) });
        if (this.isCloseBracket(token)) return new Node({ type: 'end' });
        else return this.setErrorType(token);
    }

    setErrorType(token) {
        if (token.includes(' ')) return new Node({ type: 'withSpace', value: token });
        if (this.isWrongString(token)) return new Node({ type: 'wrongString', value: token });
        else return new Node({ type: 'unknownType', value: token })
    }

    isWrongString(token) {
        return (this.isQuotesSurrounded(token, "'") && !this.hasNoMoreQuotes(token, "'")) ||
            (this.isQuotesSurrounded(token, '"') && !this.hasNoMoreQuotes(token, '"'));
    }

    isString(token) {
        return (this.isQuotesSurrounded(token, "'") && this.hasNoMoreQuotes(token, "'")) ||
            (this.isQuotesSurrounded(token, '"') && this.hasNoMoreQuotes(token, '"'));
    }

    isQuotesSurrounded(token, quote) {
        return token.startsWith(quote) && token.endsWith(quote);
    }

    hasNoMoreQuotes(token, quote) {
        return !token.slice(1, token.length - 1).includes(quote);
    }

    countQuotes(token, quote) {
        return token.slice(1, token.length - 1).split(quote).length - 1;
    }

    isOpenArray(token) {
        return token === '[';
    }

    isBoolean(token) {
        return token === 'true' || token === 'false';
    }

    isNull(token) {
        return token === 'null';
    }

    isOpenObject(token) {
        return token === '{';
    }

    isObjectKey(token) {
        return token.endsWith(':');
    }

    isCloseBracket(token) {
        return token === ']' || token === '}';
    }
}
module.exports = Lexer;