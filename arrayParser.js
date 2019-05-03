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

    checkSyntaxError(val) {
        if(val[0] === 't') {return 'true' === val;}
        if(val[0] === 'f') {return 'false' === val;}
        if(val[0] === 'n') {return 'null' === val;}
        if(val[0] === "'") {return !val.slice(1, val.length-1).split('').some((el) => el === "'");}
        return !isNaN(val);
    }

    addValueToStack(val) {
        if (val === '[') {
            this.stackPointer++;
            this.stack.push([]);
        } else if (val === ']') {
            this.stackPointer--;
            if(this.stackPointer > - 1) {this.stack[this.stackPointer].push(this.stack.pop());}
        } else {
            if(this.checkSyntaxError(val)) {return this.stack[this.stackPointer].push(val)}
            console.log(`${val}은 잘못된 문자열 입니다.`)
        }
    }

    lexer(arr) {
        this.stack = [];
        this.stackPointer = -1;
        arr.forEach((val) => {this.addValueToStack(val)});
        this.lexedData = this.stack[0];
    }

    parser(arr) {
        const resultObj = {
            type: 'array',
            child: []
        };
        arr.forEach((val) => {
            if (Array.isArray(val)) {
                resultObj.child.push(this.parser(val));
            } else {
                const obj = {
                    type: 'number',
                    value: val,
                    child: []
                };
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