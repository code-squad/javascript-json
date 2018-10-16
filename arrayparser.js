// 데이터 타입에 따라 생성되는 class
class Data {
    constructor(type, value) {
        if (type === 'number' || type === 'string') {
            this.type = type;
            this.value = value;
        }
        if (type === 'array' || type === 'object') {
            this.type = type;
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
            if (!tokens[this.index].match(/\.|[0-9]/)) return Number(numValue);
            else numValue += tokens[this.index];

            this.index += 1;
        }
        return Number(numValue);
    }

    array() { // 인자 type이 array일 경우
        const tokens = this.tokens;
        const parsedData = [];

        this.index += 1;

        while (this.index < tokens.length) {
            const token = tokens[this.index];

            if (token.match(/\]/)) {
                this.index += 1;
                return parsedData;
            }
            else if (token.match(/\[/)) {
                parsedData.push(this.array());
            }
            else if (token.match(/[0-9]/)) {
                parsedData.push(this.number());
            }
            else if (token.match(/\s|,/)) {
                this.index += 1;
            }
        }
    }

    execution() { // 토큰나이저 실행
        if (this.tokens.match(/^\[/)) return this.array();
        else if (this.tokens.match(/^[0-9]/)) return this.number();
    }
}

const arrayParser = function (str) {
    const tokenizer = new Tokenizer(str);
    const parsedData = tokenizer.execution();
    return util.dataFormat(parsedData);
}

const util = {
    dataFormat(data) {
        if (typeof data === 'number') return new Data('number', data);

        if (data instanceof Array) {
            let dataTree = new Data('array');
            debugger;
            data.forEach(element => this.classifyData(dataTree, element));
            return dataTree;
        }
    },

    classifyData(dataTree, data) {
        const dataType = typeof data;

        if (dataType === 'number') dataTree.child.push(new Data(dataType, data));
        else if (data instanceof Array) dataTree.child.push(this.dataFormat(data));

        return dataTree;
    }
}

/*
Test Case
const str = "[123,[22,23,[11,[112233],112],55],33]";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2)); 
*/