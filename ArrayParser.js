class ArrayParser {

    constructor() {
        this.stack = [];
    }


    tokenizer(string) {
        string = string.split('');
        const array = [];
        let token = '';

        while (string.length > 0) {
            const onePiece = string.shift();
            if (onePiece === '[') {
                array.push(onePiece);
                continue;
            }
            if (onePiece === ']') {
                if (token !== '') {
                    array.push(token);
                }
                array.push(onePiece);
                token = '';
                continue;
            }
            if (onePiece === ',') {
                if (token !== '') array.push(token)
                token = '';
                continue;
            }
            token += onePiece;
        }

        return array.map(x => x.trim());
    }

    lexer(token) {
        // 더 쉽고 간단한 방법이 있을지 고민해보자.
        if ("[]".includes(token)) return 'array';
        if (token === 'true' || token === 'false') return 'boolean';
        if (token === 'null') return 'null';
        if (`'"`.includes(token[0]) && `'"`.includes(token[token.length - 1])) return 'string';

        return 'number';
    }

    makeObject(_type, token) {
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

    parser(array) {
        if (typeof this.stack[0] === 'object') return this.stack[0];

        const token = array.shift();
        const _type = this.lexer(token);
        let _stack = this.makeObject(_type, token);
        if (_stack.type === 'array') _stack = this.tokenJoiner(_stack);
        this.stack.push(_stack);

        return this.parser(array);
    }

    run(input) {
        const array = this.tokenizer(input);

        return this.parser(array);
    }
}

class TokenError {

    isString(token) {
        const lastIndex = token.length - 2;
        if (token.lastIndexOf("'", lastIndex) > 0 || token.lastIndexOf('"', lastIndex) > 0) throw new Error(`${token} is not a string.`)
    }

}

const arrayParser = new ArrayParser();
const str = "['1a3', [null, false, ['11', [112233], [112]], 55, '99'], 33, true]";

const result = arrayParser.run(str);
console.log(result);
console.log(JSON.stringify(result, null, 2));