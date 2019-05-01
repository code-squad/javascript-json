const str = "[123, [22, [55, 66], 33], 44]";

class Tokenizer {
    insertCommaToBrackets(str) {
        str = str.replace(/\[/g, '[,');
        str = str.replace(/\]/g, ',]');
        return str;
    }
    removeSpace(str) {
        let arr = str.split(',');
        arr = arr.map(el => el.trim());
        str = arr.join();
        return str;
    }
    tokenizeByChar(str, char) {
        str = this.insertCommaToBrackets(str);
        str = this.removeSpace(str);
        const arr = str.split(char)
        return arr;
    }
}

class Lexer {
    decideType(str) {
        if (str === '[') {
            const obj = {
                type: 'array',
                child: []
            }
            return obj;
        }
        if (isFinite(str) && str !== null) {
            const obj = {
                type: 'number',
                value: str,
                child: []
            }
            return obj;
        }
        if (str === ']') {
            const obj = {
                type: 'end'
            }
            return obj;
        }
    }
}

class ArrayParser {
    constructor(tokenizer, lexer) {
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.nodeQueue = []
    }

    parseToken(parentNode) {
        const node = this.nodeQueue.shift();
        if (node.type === 'end') {
            return parentNode;
        } else if (node.type === 'array') {
            let childNode;
            while (!this.isLoopEnd(node, this.nodeQueue)) {
                childNode = this.parseToken(node);
                if (childNode) break;
            }
            parentNode.child.push(childNode);
        } else {
            parentNode.child.push(node);
        }
    }

    getParsedStr(str) {
        const arr = this.tokenizer.tokenizeByChar(str, ',');

        arr.forEach(el => this.nodeQueue.push(this.lexer.decideType(el)));

        const rootNode = this.nodeQueue.shift();

        while (!this.isLoopEnd(rootNode, this.nodeQueue)) {
            this.parseToken(rootNode);
        }
        return rootNode;
    }

    isLoopEnd(node, nodeQueue) {
        if (node.type === 'end') return true;
        if (nodeQueue.length === 0) return true;
        return false;
    }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser(tokenizer, lexer);

const result = arrayParser.getParsedStr(str);
console.log(JSON.stringify(result, null, 2));