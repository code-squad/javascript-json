class ArrayParser {
    constructor(tokenError) {
        this.stack = [];
        this.errorChecker = tokenError;
    }

    tokenizer(string) {
        string = string.replace(/\[/g, '[,').replace(/\]/g, ',]').split(',');
        return string.map(x => x.trim());
    }

    lexer(token) {
        // 더 쉽고 간단한 방법이 있을지 고민해보자.
        if ("[]".includes(token)) return 'array';
        if (token === true || token === false) return 'boolean';
        if (token === null) return 'null';
        if (`'"`.includes(token[0]) && `'"`.includes(token[token.length - 1])) {
            this.errorChecker.isString(token);
            return 'string';
        }
        this.errorChecker.isNumber(token);
        return 'number';
    }

    parser(_type, token) {
        if (token === '[') return token;
        if (token === ']') return { type: _type, child: [] };

        return { type: _type, value: token, child: [] };
    }

    tokenJoiner(_stack) {
        while (this.stack.length > 0) {
            const arrayChild = this.stack.pop()
            if (arrayChild === '[') break;
            _stack.child.unshift(arrayChild)
        }

        return _stack;
    }

    app(array) {
        if (typeof this.stack[0] === 'object') return this.stack[0];

        const token = array.shift();
        const _type = this.lexer(token);
        let _stack = this.parser(_type, token);
        if (_stack.type === 'array') _stack = this.tokenJoiner(_stack);
        this.stack.push(_stack);

        return this.app(array);
    }

    run(input) {
        const array = this.tokenizer(input);

        return this.app(array);
    }
}

class TokenError {
    isString(token) {
        const lastIndex = token.length - 2;
        if (token.lastIndexOf("'", lastIndex) > 0 || token.lastIndexOf('"', lastIndex) > 0) throw new Error(`${token} is not a string.`)
    }

    isNumber(token) {
        if (isNaN(token)) throw new Error(`${token} is a unknown type.`);
    }
}

const tokenError = new TokenError();
const arrayParser = new ArrayParser(tokenError);
const str = "['1a3', [null, false, ['11', [112233], 112], 55, '99'], 33, true]";

console.log(arrayParser.run(str));