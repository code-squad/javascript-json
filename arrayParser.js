const Node = require('./token_node.js');
const errorMesg = require('./error_message.js');

const node = new Node();

class ArrayParser {
    constructor(jsonStr) {
        this.jsonStr = jsonStr;
    }

    tokenize() {
        const token = this.jsonStr.replace(/\[/g, '[,').replace(/]/g, ',]').split(',').map(v => v.trim());
        return token;
    }

    getTypeToken(token) {
        if (!isNaN(token)) {
            return new Node('number', Number(token));
        } else if (token === 'true') {
            return new Node('boolean', true);
        } else if (token === 'false') {
            return new Node('boolean', false);
        } else if (token === 'null') {
            return new Node('null', null);
        } else if (token === '[') {
            return new Node('startArray', '[');
        } else if (token === ']') {
            return new Node('endArray', ']');
        } else if (typeof(token) === 'string') {
            this.isCorrectString(token);
            return new Node('string', token);
        }
    }

    isCorrectString(token) {
        let count = 0;
        let position = token.indexOf("\'");

        while (position !== -1) {
            count++;
            position = token.indexOf("\'", position + 1);
        }

        if (count !==0 && count % 2 === 0) {
            return true;
        } else if (count % 2 !== 0 ) {
            throw new Error(`${token}은 ${errorMesg.NOT_VALID_STRING}`);
        } else {
            throw new Error(`${token}은 ${errorMesg.UNKNOWN_TYPE}`);
        }
    }

    lex(token) {
        const lexArr = token.map(el => this.getTypeToken(el));
        return lexArr;
    }

    parse(lexer) {
        const stack = [];
        let currentNode;
        let result;

        for (let value of lexer) {
            if (value.type === 'startArray') {
                stack.push({type: 'array', child: []});
            } else if (value.type === 'endArray'){
                currentNode = stack.pop();
                if (stack.length === 0) {
                    result = currentNode;
                } else {
                    stack[stack.length-1].child.push(currentNode);
                }
            } else {
                stack[stack.length-1].child.push(value);
            }
        }
        return result;
    }

    run() {
        const token = this.tokenize();
        const lexer = this.lex(token);
        const parser = this.parse(lexer);
        return parser;
    }
}

const jsonStr = "['1a3',[null, false, ['11', [112233], 112], 55, '99'], 33, true]";
const jsonStr2 = "['1a'3', [22, 23, [11, [112233], 112], 55], 33]"; // '1a'3'은 올바른 문자열이 아닙니다.
const jsonStr3 = "['1a3', [22, 23, [11, [112233], 112], 55], 3d3]"; // 3d3은 알수 없는 타입입니다.
const arrayParser = new ArrayParser(jsonStr);
const result = arrayParser.run();
console.log(JSON.stringify(result, null, 2));

