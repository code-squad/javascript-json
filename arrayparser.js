// 데이터 타입에 따라 생성되는 class
class Data {
    constructor(type, value) {
        if (type === 'number') {
            this.type = type;
            this.value = value;
            this.child = [];
        } else if (type === 'array') {
            this.type = type;
            this.child = [];
        }
    }
}

const arrayParser = function (str) {
    const parsedData = tokenizer(str);
    return dataFormat(parsedData);
}

const tokenizer = function (str) {
    let idx = 0;

    function array() {
        const newArr = [];
        idx += 1;
        while (idx < str.length) {
            if (str[idx] === ']') {
                return newArr;
            }
            if (str[idx] === '[') {
                newArr.push(array());
            }
            if (str[idx].match(/[0-9]/)) {
                newArr.push(number());
            }
            if (str[idx].match(/\s|,/)) {
                idx += 1;
            }
        }
        return newArr;
    }

    function number() {
        let numValue = '';
        while (idx < str.length) {
            if (str[idx].match(/[0-9]/)) {
                numValue += str[idx];
            }
            if (str[idx].match(/\D/)) {
                return Number(numValue);
            }
            idx += 1;
        }
        return Number(numValue);
    }

    if (str[idx] === '[') {
        return array();
    }
    if (str[idx].match(/[0-9]/)) {
        return number();
    }
}

const dataFormat = function (data) {
    if (typeof data === 'number') {
        return new Data('number', data);
    }

    let result;
    if (data instanceof Array) {
        result = new Data('array');
        data.forEach(element => {
            const type = typeof element;
            type === 'number'
                ? result.child.push(new Data(type, element)) : data instanceof Array
                    ? result.child.push(dataFormat(element)) : '';
        });
    }
    return result;
}