// 데이터 타입에 따라 생성되는 class
class Data {
    constructor(type, value) {
        if (type === 'number' || type === 'string') {
            this.type = type;
            this.value = value;
        }
        if (type === 'array' || type === 'object') {
            this.type = type;
            this.value = 'ArrayObject'
            this.child = [];
        }
    }
}

class Tokenizer {
    constructor(str) {
        this.tokens = str;
        this.index = 0;
    }

    number() { // 인자 type이 number일 경우
        const tokens = this.tokens;
        let numValue = '';

        while (this.index < tokens.length) {
            if (tokens[this.index].match(/\.|[0-9]/)) {
                numValue += tokens[this.index];
                this.index += 1;
            }
            else if (tokens[this.index].match(/\D/)) {
                return Number(numValue);
            }
        }
        return Number(numValue);
    }

    array() { // 인자 type이 array일 경우
        const parsedData = [];
        const tokens = this.tokens;

        this.index += 1;

        while (this.index < tokens.length) {
            if (tokens[this.index].match(/\]/)) {
                this.index += 1;
                return parsedData;
            }
            else if (tokens[this.index].match(/\[/)) {
                parsedData.push(this.array());
            }
            else if (tokens[this.index].match(/[0-9]/)) {
                parsedData.push(this.number());
            }
            else if (tokens[this.index].match(/\s|,/)) {
                this.index += 1;
            }
        }
    }

    execution() { // 토큰나이저 실행
        const tokens = this.tokens;

        if (tokens.match(/^\[/)) return this.array();
        else if (tokens.match(/^[0-9]/)) return this.number();
    }
}

const arrayParser = function (str) {
    const tokenizer = new Tokenizer(str);
    const parsedData = tokenizer.execution();
    return dataFormat(parsedData);
}

function dataFormat(data) {
    if (typeof data === 'number') {
        return new Data('number', data);
    }

    let result;
    if (data instanceof Array) {
        result = new Data('array');
        data.forEach(element => {
            const dataType = typeof element;
            dataType === 'number'
                ? result.child.push(new Data(dataType, element)) : element instanceof Array
                    ? result.child.push(dataFormat(element)) : '';
        });
    }
    return result;
}

/*
Test Case
const str = '[123, [22, 45, [26, 89], 78], 33]';
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));
*/