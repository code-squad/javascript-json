const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');

class ArrayParser {
    constructor({ tokenizer, lexer, seperator }) {
        this.seperator = seperator;
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.nodeQueue = [];
    }

    parseToken(parentNode) {
        const node = this.nodeQueue.shift();
        if (node.type === 'end') {
            return parentNode;
        } else if (node.type === 'array') {
            let childNode;
            while (true) {
                childNode = this.parseToken(node);
                if (childNode) break;
            }
            parentNode.child.push(childNode);
        } else {
            parentNode.child.push(node);
        }
    }

    getParsedStr(str) {
        const tokens = this.tokenizer.tokenizeByChar(str, this.seperator);

        tokens.forEach(token => this.nodeQueue.push(this.lexer.decideType(token)));

        const rootNode = this.nodeQueue.shift();

        while (this.nodeQueue.length) {
            this.parseToken(rootNode);
        }
        return rootNode;
    }
}

const seperator = ',';
const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser({ tokenizer, lexer, seperator });

const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result = arrayParser.getParsedStr(str);
console.log(JSON.stringify(result, null, 2));