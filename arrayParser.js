const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');

class ArrayParser {
    constructor({ tokenizer, lexer }) {
        this.seperator = ',';
        this.tokenizer = tokenizer;
        this.lexer = lexer;
    }

    parseToken(parentNode, tokens) {
        const node = tokens.shift();
        if (node.type === 'end') {
            return parentNode;
        } 
        if (node.type === 'array') {
            let childNode;
            while (true) {
                childNode = this.parseToken(node, tokens);
                if (childNode) break;
            }
            parentNode.child.push(childNode);
        } else {
            parentNode.child.push(node);
        }
    }

    getParsedStr(str) {
        let tokens = this.tokenizer.tokenizeByChar(str, this.seperator);

        tokens = tokens.map(token => this.lexer.decideType(token));

        const rootNode = tokens.shift();

        while (tokens.length) {
            this.parseToken(rootNode, tokens);
        }
        return rootNode;
    }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser({ tokenizer, lexer });

const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result = arrayParser.getParsedStr(str);
console.log(JSON.stringify(result, null, 2));