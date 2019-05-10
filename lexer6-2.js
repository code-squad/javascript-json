
class Lexer {

    constructor(tokenError) {
        this.tokenError = tokenError;
    }

    run(token) {
        if (this.isArray(token)) return 'array';
        if (this.isBoolean(token)) return 'boolean';
        if (this.isNull(token)) return 'null';
        if (this.isNumber(token)) return 'number';
        if (this.isString(token)) {
            this.tokenError.isThisRealString(token);
            return 'string';
        }
        return this.tokenError.itIsUndefinedType(token);
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
        return (token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'")) ? true : false;
    }

    isNumber(token) {
        return !isNaN(token) ? true : false;
    }
}

module.exports = Lexer;