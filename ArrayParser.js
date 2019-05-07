const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const Node = require('./Node');

class ArrayParser {
    constructor({tokenizer, lexer}) {
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.queue = [];
    }

    parse(input) {
        const tokens = this.tokenizer.tokenize(input);
        tokens.forEach(token => this.queue.push(this.lexer.lex(token)));
        const firstNode = this.queue.shift();

        if (firstNode.type === 'arrStart') {
            const rootNode = new Node('Array');
            this.arrayParse(rootNode);
            return rootNode;
        } else {
            throw Error(`${firstNode.value} invalid array type error`);
        }
    }

    arrayParse(parentNode) {
        while (this.queue.length !== 0) {
            const node = this.queue.shift();
            if (node.type === 'arrEnd') {
                return parentNode;
            }
            if (node.type === 'arrStart') {
                node.type = 'childArray';
                let childNode;
                while (!childNode) {
                    childNode = this.arrayParse(node);
                }
                parentNode.child.push(childNode);
            } else {
                parentNode.child.push(node)
            }
        }
    }
}

const str = '[123, 22, [0.0033, 123], -45, 0.6, 7.828, 6]';

const tokenizer = new Tokenizer;
const lexer = new Lexer;
const arrayParser = new ArrayParser;
const tokens = tokenizer.tokenize(str);
const lexedTokens = lexer.lex(tokens);
console.log(lexedTokens);
console.log(arrayParser.parse(lexedTokens));