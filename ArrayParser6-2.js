const Tokenizer = require('./tokenizer6-2');
const Lexer = require('./lexer6-2');

class ArrayParser {

    constructor(obj) {
        this.tokenizer = obj.tokenizer;
        this.lexer = obj.lexer;
        this.stack = [];
    }

    makeObject(_type, token) {
        if (token === '[') return token;
        if (token === ']') return { type: _type, child: [] };

        return { type: _type, value: token, child: [] };
    }

    tokenJoiner(_stack) {
        while (this.stack.length > 0) {
            const arrayChild = this.stack.pop();
            if (arrayChild === '[') break;
            _stack.child.unshift(arrayChild)
        }

        return _stack;
    }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser({ tokenizer, lexer });