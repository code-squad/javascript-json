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

const tokenizer = new Tokenizer;
const lexer = new Lexer;
const arrayParer = new ArrayParser({tokenizer, lexer});
const str = "[123, [22, 33], 234, [-45, 0.6], '78', '6', [[null, false], true]]";
result = arrayParer.parse(str);
console.log(result);
console.log(JSON.stringify(result, null, 2));
