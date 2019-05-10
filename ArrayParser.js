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
            return this.arrayParse(rootNode);
        } else {
            throw Error(`${firstNode.value} 은 rootNode가 될 수 있는 형태('[')가 아닙니다.`);
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

const tokenizer = new Tokenizer;
const lexer = new Lexer;
const arrayParer = new ArrayParser({tokenizer, lexer});

module.exports = arrayParer;