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

    getParseTree(str) {
        let tokens = this.tokenizer.getTokens(str, this.seperator);
        
        tokens = tokens.map(token => this.lexer.setType(token));

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

const str = "[ {easy : ['hello', {a:'a'}, 'world'] } , { a:'str', b:[ 912,[5656,33], {key : 'innervalue', newkeys: [1,2,3,4,5]} ] } ]";
const result = arrayParser.getParseTree(str);
console.log(JSON.stringify(result, null, 2));