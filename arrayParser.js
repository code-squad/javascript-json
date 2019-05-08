const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const ErrorChecker = require('./errorChecker');
const Stack = require('./stack');

class ArrayParser {
    constructor({ tokenizer, lexer, errorChecker, stack }) {
        this.seperator = ',';
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.errorChecker = errorChecker;
        this.stack = stack;
    }

    getChildNode(parentNode, tokens) {
        while (true) {
            const childNode = this.parseToken(parentNode, tokens);
            if (childNode) return childNode;
        }
    }

    setKeyValueNode(parentNode, keyNode, tokens) {
        const valueNode = tokens.shift();
        valueNode.key = keyNode.key;
        if (valueNode.type === 'array') {
            const childNode = this.getChildNode(valueNode, tokens);
            parentNode.child.push(childNode);
        } else {
            parentNode.child.push(valueNode);
        }
    }

    parseToken(parentNode, tokens) {
        const node = tokens.shift();
        if (node.type === 'end') {
            return parentNode;
        }
        if (node.type === 'array' || node.type === 'object') {
            const childNode = this.getChildNode(node, tokens);
            parentNode.child.push(childNode);
        } else if (node.type === 'key') {
            this.setKeyValueNode(parentNode, node, tokens);
        } else {
            parentNode.child.push(node);
        }
    }

    getParseTree(str) {
        let tokens = this.tokenizer.getTokens(str, this.seperator);

        this.errorChecker.checkBrackets(tokens);
        
        tokens = tokens.map(token => this.lexer.setType(token));
        
        this.errorChecker.checkNodes(tokens);

        const rootNode = tokens.shift();

        while (tokens.length) {
            this.parseToken(rootNode, tokens);
        }
        return rootNode;
    }
}

const stack = new Stack();
const errorChecker = new ErrorChecker();
const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser({ tokenizer, lexer, errorChecker, stack });

const str = "[ {easy : ['he llo', {a:'a'}, 'world'] } , { a :123, a:'str', b:[ 912,[5656,33], {key : 'innervalue', newkeys: [1,2,3,4,5]} ] } ]";
const result = arrayParser.getParseTree(str);
console.log(JSON.stringify(result, null, 2));