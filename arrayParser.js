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
            } else {
                changedStr += str[index];
            }
            index++;
        }
        this.tokenizedData = changedStr.split(',').map((val) => val.trim());
    }

    lexer(arr) {
        this.stack = [];
        this.stackPointer = -1;
        arr.forEach((val) => { if (this.checkDataType(val)) { this.makeArrData(val); } });
        this.lexedData = this.stack[0];
    }

    parser(arr) {
        const resultObj = {
            type: 'array',
            child: []
        };
        const obj = {
            type: null,
            value: null,
            child: []
        };
        arr.forEach((val) => {
            if (Array.isArray(val)) { return resultObj.child.push(this.parser(val)); }
            obj.type = this.checkDataType(val);
            obj.value = this.changeDataType(val);
            resultObj.child.push(obj);
        });
        return resultObj
    }

    checkDataType(val) {
        let isString = null;
        if (val[0] === "'") { isString = !val.slice(1, val.length - 1).split('').some((el) => el === "'"); }
        if (val === 'true' || val === 'false') { return 'boolean' }
        if (val === 'null') { return 'object' }
        if (isString) { return 'string' }
        if (!isNaN(val)) { return 'number' }
        if (val === '[' || val === ']') { return true; }
        console.log(`${val}은 잘못된 문자열 입니다.`);
    }

    makeArrData(val) {
        if (val === '[') {
            this.stackPointer++;
            this.stack.push([]);
        } else if (val === ']') {
            this.stackPointer--;
            if (this.stackPointer > - 1) { this.stack[this.stackPointer].push(this.stack.pop()); }
        } else {
            this.stack[this.stackPointer].push(val);
        }
    }

    changeDataType(val) {
        if (val === 'true') { return true }
        if (val === 'false') { return false }
        if (val === 'null') { return null }
        if (!isNaN(val)) { return Number(val) }
        return val
    }
}

