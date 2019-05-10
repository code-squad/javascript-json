class ArrayParser {
    constructor() {
    }

    tokenizer(str) {
        let changedStr = '';
        let index = 0
        while (index < str.length) {
            if (str[index] === '[') {
                changedStr += '[' + ',';
            } else if (str[index] === ']') {
                changedStr += ',' + ']';
            } else if (str[index] === '{') {
                changedStr += '{' +  ',';
            }else if (str[index] === '}') {
                changedStr += ',' + '}';
            }else if (str[index] === ':') {
                changedStr += ':' + ',';
            }else {
                changedStr += str[index];
            }
            index++;
        }
        this.tokenizedData = changedStr.split(',').map((val) => val.replace(/\s/g,''));
    }

    lexer(arr) {
        arr = arr.map((val, i, arr) => this.makeObjData(val, i, arr));
        arr = arr.filter(val => val.type !== 'key');
        this.lexedData = arr;
    }

    parser(inputToken) {
        while (this.lexedData.length) {
            let currentToken = this.lexedData.shift();
            if (currentToken.value === ']' || currentToken.value === '}') return inputToken;
            if (currentToken.type === 'array' || currentToken.type === 'object') {
                currentToken = this.parser(currentToken);
            }
            inputToken.child.push(currentToken);
        }
    }

    makeObjData(val, i, arr) {
        const obj = {};
        if (i > 0 && arr[i - 1].slice(-1) === ':') obj.key = arr[i - 1].slice(0, -1);
        if (val !== '[' && val !== '{') { obj.value = this.changeDataType(val); }
        obj.type = this.checkTokenType(val);
        obj.child = [];
        return obj
    }

    checkTokenType(val) {
        let isString = null;
        if (val[0] === "'") { isString = !val.slice(1, val.length - 1).split('').some((el) => el === "'"); }
        if (val === 'true' || val === 'false') { return 'boolean' }
        if (val === 'null') { return 'null' }
        if (isString) { return 'string' }
        if (!isNaN(val)) { return 'number' }
        if (val[val.length - 1] === ':') { return 'key' }
        if (val === '[') { return 'array' }
        if (val === ']') { return 'closeSquareBracket' }
        if (val === '{') { return 'object'}
        if (val === '}') { return 'closeCurlyBracket'}
    }

    changeDataType(val) {
        if (val === 'true') { return true }
        if (val === 'false') { return false }
        if (val === 'null') { return null }
        if (!isNaN(val)) { return Number(val) }
        return val
    }

    executeParser(data) {
        this.tokenizer(data);
        this.lexer(this.tokenizedData);
        return this.parser(this.lexedData);
    }
}

const arrayParser = new ArrayParser();
console.log(arrayParser.executeParser("['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"));
