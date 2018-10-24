module.exports = function lexer(tokens) {
    const lexemes = [];

    for (let token of tokens) {
        lexemes.push(new Lexeme(token));
    }

    return lexemes;
}

class Lexeme {
    constructor(token) {
        this.type = this.getType(token);
        this.value = this.getValue(this.type, token);
    }

    getType(token) {
        const typeCheck = new TypeCheck;
        const error = new Error;

        if (typeCheck.isNull(token)) return 'null';
        if (typeCheck.isArray(token)) return 'array';
        if (typeCheck.isNumber(token)) return 'number';
        if (typeCheck.isString(token)) return 'string';
        if (typeCheck.isBoolean(token)) return 'boolean';
        if (typeCheck.isArrayClose(token)) return 'arrayClose';

        return error.throw(token);
    }

    getValue(type, token) {
        if (type === 'null') return null;
        if (type === 'string') return token;
        if (type === 'arrayClose') return 'close';
        if (type === 'array') return 'ArrayObject';
        if (type === 'number') return Number(token);
        if (type === 'boolean') return token === 'true' ? true : false;
    }
}

class TypeCheck {
    isArray(token) {
        return token === '[';
    }

    isNull(token) {
        return token === 'null';
    }

    isBoolean(token) {
        return token === 'true' || token === 'false';
    }

    isArrayClose(token) {
        return token === ']';
    }

    isNumber(token) {
        return !token.match(/[^0-9|^.]/);
    }

    isString(token) {
        const subStr = token.match(/'.+?'/);
        return subStr ? subStr[0] === token : false;
    }
}

class Error {
    throw(token) {
        throw `${token}은 올바른 타입이 아닙니다.`;
    }
}
