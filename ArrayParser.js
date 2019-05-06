class ArrayParser {
    constructor() {
        this.stack = [];
    }

    tokenizer(string) {
        return string.split(' ').join('').replace(/\[/g, '[,').replace(/\]/g, ',]').split(',');
    }

    lexer(token) {
        const typeBox = {
            array: "[]",
            boolean: 'true, false',
            null: 'null',
            string: `'"`,
            number: '0123456789'
        }

        for (let type in typeBox) {
            if (typeBox[type].includes(token)) return type;
            if (typeBox[type].includes(token[0])) return type;
        }
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

class tokenError {
    isString(token) {
        // 'a2'3' 과 같이 문자열 안에 따옴표가 더 있으면 에러를 발생하도록 하자
        const length = token.length;
    }

    isNumber(token) {
        // 3d3 과 같은 문자열이 있을때 에러를 발생시키자.
    }
}

const arrayParser = new ArrayParser();
const str = "['1a3', [null, false, ['11', [112233], 112], 55, '99'], 33, true]";

console.log(arrayParser.run(str));