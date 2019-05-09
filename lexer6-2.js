
class Lexer {

    run(token) {
        if (isArray(token)) return 'array';
        if (isBoolean(token)) return 'boolean';
        if (isNull(token)) return 'null';
        if (isString(token)) return 'string';
        if (isNumber(token)) return 'number';
        return 'undefined';
    }

    isArray(token) {
        return '[]'.includes(token) ? true : false;
    }

    isBoolean(token) {
        return token === 'true' || token === 'false' ? true : false;
    }

    isNull(token) {
        return token === 'null' ? true : false;
    }

    isString(token) {
        return `'"`.includes(token[0]) && `'"`.includes(token[token.length - 1]) ? true : false;
    }

    isNumber(token) {
        return !isNaN(token) ? true : false;
    }
}

module.exports = Lexer;