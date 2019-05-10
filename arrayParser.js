class ArrayParser {
    constructor() {
        this.typeOverview = {
            boolean : 0,
            null    : 0,
            string  : 0,
            number  : 0,
            array   : 0,
            object  : 0
        };
    }

    tokenizer(str) {
        let changedStr = '';
        let index = 0
        while (index < str.length) {
            switch (str[index]) {
                case '[':
                    changedStr += '[' + ',';
                    break;
                case ']':
                    changedStr += ',' + ']';
                    break;
                case '{':
                    changedStr += '{' + ',';
                    break;
                case '}':
                    changedStr += ',' + '}';
                    break;
                case ':':
                    changedStr += ':' + ',';
                    break;
                default:
                    changedStr += str[index];
            }
            index++;
        }
        this.tokenizedData = changedStr.split(',').map((val) => val.replace(/\s/g, ''));
    }

    lexer(arr) {
        arr = arr.map((val, i, arr) => this.makeObjToken(val, i, arr));
        arr = arr.filter(val => val.type !== 'key');
        this.lexedData = arr;
    }

    parser(inputToken) {
        while (this.lexedData.length) {
            let currentToken = this.lexedData.shift();
            if (currentToken.value === ']' || currentToken.value === '}') return inputToken;
            if (currentToken.type === 'array' || currentToken.type === 'object') currentToken = this.parser(currentToken);
            inputToken.child.push(currentToken);
        }
    }

    makeObjToken(val, i, arr) {
        const obj = {};
        if (i > 0 && arr[i - 1].slice(-1) === ':') obj.key = arr[i - 1].slice(0, -1);
        if (val !== '[' && val !== '{') obj.value = this.changeTokenType(val);
        obj.type = this.checkTokenType(val);
        obj.child = [];
        return obj
    }

    checkTokenType(val) {
        let isString = null;
        if (val[0] === "'") isString = !val.slice(1, val.length - 1).split('').some((el) => el === "'");
        if (isString) return 'string'
        if (!isNaN(val)) return 'number'
        if (val[val.length - 1] === ':') return 'key'
        switch (val) {
            case 'true': return 'boolean'
            case 'false': return 'boolean'
            case 'null': return 'null'
            case '[': return 'array'
            case ']': return 'closeSquareBracket'
            case '{': return 'object'
            case '}': return 'closeCurlyBracket'
        }
    }

    changeTokenType(val) {
        if (val === 'true') return true
        if (val === 'false') return false
        if (val === 'null') return null
        if (!isNaN(val)) return Number(val)
        return val
    }

    checkError(tokenArr) {
        this.arrBracketCount = 0;
        this.objBracketCount = 0;
        for (let val of tokenArr) {
            if (!this.checkTokenType(val)) return `${val}은 잘못된 문자열 입니다.`
            this.countBracket(val);
        }
        if (this.arrBracketCount) return '정상적으로 종료되지 않은 배열이 있습니다.'
        if (this.objBracketCount) return '정상적으로 종료되지 않은 객체가 있습니다.'
    }

    countBracket(val) {
        if (val === '[') this.arrBracketCount++;
        if (val === ']') this.arrBracketCount--;
        if (val === '{') this.objBracketCount++;
        if (val === '}') this.objBracketCount--;
    }

    countTokenType(token) {
        token.forEach(val => {
            switch (val.type) {
                case 'boolean': return this.typeOverview.boolean++;
                case 'null'   : return this.typeOverview.null++;
                case 'string' : return this.typeOverview.string++;
                case 'number' : return this.typeOverview.number++;
                case 'array'  : return this.typeOverview.array++;
                case 'object' : return this.typeOverview.object++;
            }
        });
        console.log(this.typeOverview);
    }

    executeParser(data) {
        this.tokenizer(data);
        const errorMessage = this.checkError(this.tokenizedData);
        if (errorMessage) return errorMessage;
        this.lexer(this.tokenizedData);
        this.countTokenType(this.lexedData);
        return this.parser(this.lexedData.shift());
    }
}

const arrayParser = new ArrayParser();
var test = arrayParser.executeParser("['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]");
console.log(JSON.stringify(test, null, 2));