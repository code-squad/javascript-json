class ArrayParser {
    constructor() {
    }

    tokenizer(str) {
        let tempStr = '';
        let index = 0
        while (index < str.length) {
            if(str[index] === '[') {
                tempStr += '[' + ',';
            }else if(str[index] === ']') {
                tempStr += ',' + ']';
            }else {
                tempStr += str[index];
            }
            index++;
        }
        this.tokenizedData = tempStr.split(',').map((val) => val.trim());
    }

    checkDataType(val) {
        let isString = null;
        if(val[0] === "'") {isString = !val.slice(1, val.length-1).split('').some((el) => el === "'");}
        
        if(val === 'true' || val === 'false') {
            return 'boolean'
        }else if(val === 'null') {
            return 'object'
        }else if(isString) {
            return 'string'
        }else if(!isNaN(val)) {
            return 'number'
        }else if(val === '[' || val === ']') {
            return true;
        }
        console.log(`${val}은 잘못된 문자열 입니다.`)
    }

    makeArrData(val) {
        if (val === '[') {
            this.stackPointer++;
            this.stack.push([]);
        } else if (val === ']') {
            this.stackPointer--;
            if(this.stackPointer > - 1) {this.stack[this.stackPointer].push(this.stack.pop());}
        } else {
            this.stack[this.stackPointer].push(val);
        }
    }

    lexer(arr) {
        this.stack = [];
        this.stackPointer = -1;
        arr.forEach((val) => {
            if(this.checkDataType(val)) {
                this.makeArrData(val);
            }});
        this.lexedData = this.stack[0];
    }

    changeDataType(val) {
        if (val === 'true') { return true }
        if (val === 'false') { return false }
        if (val === 'null') { return null }
        if (!isNaN(val)) { return Number(val) }
        return val
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
            if (Array.isArray(val)) {
                resultObj.child.push(this.parser(val));
            } else {
                obj.type = this.checkDataType(val);
                obj.value = this.changeDataType(val);
                resultObj.child.push(obj);
            }
        });
        return resultObj;
    }
}

const arrayParser = new ArrayParser();


//testCase//
arrayParser.tokenizer("[123, 22, 33]")
// arrayParser.tokenizer("[123, [22, 44], [11, 22, [33, 44, 55], 66], 33]");
// arrayParser.tokenizer("[[123, 22, 33], [1, 2, 3]]");
console.log(arrayParser.tokenizedData);

arrayParser.lexer(arrayParser.tokenizedData);
// console.log(arrayParser.lexedData);

console.log(arrayParser.parser(arrayParser.lexedData));