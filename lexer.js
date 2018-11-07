exports.lexer = function (tokens) {
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
        const typeError = new TypeError;

        if (typeCheck.isArray(token)) return 'array';
        if (typeCheck.isArrayClose(token)) return 'arrayClose';
        if (typeCheck.isNumber(token)) return 'number';
        if (typeCheck.isString(token)) return 'string';
        if (typeCheck.isObject(token)) return 'object';
        if (typeCheck.isObjectClose(token)) return 'objectClose';
        if (typeCheck.isKey(token)) return 'keyString';
        if (typeCheck.isBoolean(token)) return 'boolean';
        if (typeCheck.isNull(token)) return 'null';

        return typeError.throw(token);
    }

    getValue(type, token) {
        if (type === 'array') return 'ArrayObject';
        if (type === 'number') return Number(token);
        if (type === 'string') return token;
        if (type === 'arrayClose') return 'close';
        if (type === 'object') return 'Object';
        if (type === 'objectClose') return 'close';
        if (type === 'keyString') return token.split(':')[0].trim();
        if (type === 'boolean') return token === 'true' ? true : false;
        if (type === 'null') return null;
    }
}

class TypeCheck {
    isArray(token) {
        return token === '[';
    }

    isNumber(token) {
        return !token.match(/[^0-9|^.]/);
    }

    isString(token) {
        const subStr = token.match(/'.+?'/);
        return subStr ? subStr[0] === token : false;
    }

    isArrayClose(token) {
        return token === ']';
    }

    isObject(token) {
        return token === '{';
    }

    isObjectClose(token) {
        return token === '}';
    }

    isKey(token) {
        if (token.match(/:/)) return true;
    }

    isBoolean(token) {
        return token === 'true' || token === 'false';
    }

    isNull(token) {
        return token === 'null';
    }
}

class TypeError {
    throw(token) {
        throw `${token}은 올바른 타입이 아닙니다.`;
    }
}