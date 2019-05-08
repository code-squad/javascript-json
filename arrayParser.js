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

    getTopNode() {
        const topNode = this.stack.pop();
        if (this.stack.isEmpty()) return topNode;
        this.stack.peek().child.push(topNode);
    }

    setKeyValueNode(keyNode, tokens) {
        const valueNode = tokens.shift();
        valueNode.key = keyNode.key;
        if (valueNode.type === 'array') {
            this.stack.push(valueNode);
        }
        else {
            this.stack.peek().child.push(valueNode);
        }
    }

    parseToken(tokens) {
        const node = tokens.shift();
        const nodeType = node.type;
        const typeMap = {
            array: () => { this.stack.push(node) },
            object: () => { this.stack.push(node) },
            key: () => { this.setKeyValueNode(node, tokens) },
            number: () => { this.stack.peek().child.push(node) },
            string: () => { this.stack.peek().child.push(node) },
            boolean: () => { this.stack.peek().child.push(node) },
            null: () => { this.stack.peek().child.push(node) },
            end: () => { return this.getTopNode() }
        }
        return typeMap[nodeType]();
    }

    getParseTree(str) {
        let tokens = this.tokenizer.getTokens(str, this.seperator);

        this.errorChecker.checkBrackets(tokens);

        tokens = tokens.map(token => this.lexer.setType(token));

        this.errorChecker.checkNodes(tokens);

        let parseTree;

        while (tokens.length) {
            parseTree = this.parseToken(tokens);
        }
        return parseTree;
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