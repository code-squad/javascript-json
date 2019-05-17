const Node = require('./node_class.js');
const errorMesg = require('./error_message.js');

const node = new Node();

module.exports = {
    'NOT_VALID_STRING' : '올바른 문자열이 아닙니다.',
    'UNKNOWN_TYPE' : '알 수 없는 타입입니다.'
}

class ArrayParser {
    constructor(jsonStr) {
        this.jsonStr = jsonStr;
    }

    //토큰화
    tokenize() {
        const token = this.jsonStr.replace(/\[/g, '[,').replace(/]/g, ',]').split(',').map(v => v.trim());
        return token;
    }

    //타입 체크
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

    //잘못된 문자열인지 아닌지 체크
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

    //의미 부여
    lex(token) {
        const lexArr = token.map(el => this.getTypeToken(el));
        return lexArr;
    }

    //구조화
    parse() {
       
    }

    //실행
    run() {
        const token = this.tokenize();
        const lexer = this.lex(token);
    }
}

const jsonStr = "['1a3',[null, false, ['11', [112233], 112], 55, '99'], 33, true]";
const jsonStr2 = "['1a'3', [22, 23, [11, [112233], 112], 55], 33]"; // '1a'3'은 올바른 문자열이 아닙니다.
const jsonStr2 = "['1a3', [22, 23, [11, [112233], 112], 55], 3d3]"; // 3d3은 알수 없는 타입입니다.
const arrayParser = new ArrayParser(jsonStr);
const result = arrayParser.run();
console.log(JSON.stringify(result, null, 2));