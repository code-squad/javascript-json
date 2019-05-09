const Tokenizer = require('./tokenizer6-2');
const Lexer = require('./lexer6-2');
const TokenError = require('./tokenError6-2');

class ArrayParser {

    constructor(obj) {
        this.tokenError = obj.tokenError;
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

    parser(array) {
        if (typeof this.stack[0] === 'object') return this.stack[0];

        const token = array.shift();
        const _type = this.lexer.run(token);
        let _stack = this.makeObject(_type, token);
        if (_stack.type === 'array') _stack = this.tokenJoiner(_stack);
        this.stack.push(_stack);

        return this.parser(array);
    }

    run(input) {
        const array = this.tokenizer.run(input);

        return this.parser(array);
    }
}

const tokenError = new TokenError();
const tokenizer = new Tokenizer();
const lexer = new Lexer(tokenError);
const arrayParser = new ArrayParser({ tokenizer, lexer, tokenError });
const str = `['1a3',[null,false,['11',[112233],112],55, '99'],33, true]`
// const str = `['1a'3',[null,false,['11',[112233],112],55, '99'],33, true]`
// const str = `['1a3',[null,false,['11',[112233],112],5d5, '99'],33, true]`
const result = arrayParser.run(str);

console.log(result);