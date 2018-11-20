class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}
const sentence = "['12',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key: 'him', newkeys: [1,2,3,4,5]}]}, true]".replace(/ /gi, '')

class Tokenize {
    constructor() {
        this.wholeDataQueue = [];
    }

    getWholeDataQueue(sentence) {
        while (sentence.length !== 0) {
            const token = this.getToken(sentence)
            this.wholeDataQueue.push(token)
            sentence = sentence.replace(token, '')
        }
        return this.wholeDataQueue
    }

    getToken(str) {
        if (this.isBraceOrComma(str)) {
            return str.slice(0, 1)
        } else if (str.indexOf(']') < str.indexOf(',')) {
            return str.slice(0, str.indexOf(']'))
        } else if (str.indexOf(',') === -1) {
            return str.slice(0, str.indexOf(']'))
        } else if (str.indexOf(':') !== -1 && str.indexOf(',') > str.indexOf(':')) {
            return str.slice(0, str.indexOf(':') + 1)
        } else if (str.indexOf('}') < str.indexOf(',')) {
            return str.slice(0, str.indexOf('}'))
        } else {
            return str.slice(0, str.indexOf(','))
        }
    }

    isBraceOrComma(str) {
        const firLocation = str[0]
        const delimitersArr = ['[',']',',','{','}']
        const ret = delimitersArr.some(v => v === firLocation)
        return ret
    }
}

class Analyze {
    constructor(queue, errorCheck) {
        this.queueArr = queue
        this.errorCheck = errorCheck
    }

    queue() {
        while (this.queueArr.length !== 0) {
            const value = this.queueArr.shift()
            if (value === '[') {
                return this.makeArrayChild(this.queueArr, value)
            } else if (value === '{') {
                return this.makeObjectChild(this.queueArr, value)
            }
        }
    }

    makeArrayChild(queueArr, value) {
        const arrayChild = this.getChild(queueArr, value)
        return new JSONData('Array', 'Array Object', arrayChild)
    }

    makeObjectChild(queueArr) {
        const objectChild = this.getChild(queueArr, value)
        return new JSONData('Object', 'Object Object', objectChild)
    }

    getChild(queueArr, checkingValue) {
        let child = [];
        while (checkingValue !== ']') {
            checkingValue = queueArr.shift()
            if (checkingValue === ',') {
                continue;
            } else if (checkingValue === '[') {
                child.push(new JSONData('Array', 'Object Array', this.getChild(queueArr, checkingValue)))
                continue;
            } else if (checkingValue === '{') {
                child.push(new JSONData('Object', 'Object Object', this.getChild(queueArr, checkingValue)))
                continue;
            } else if (this.isObjectKey(checkingValue)) {
                child.push(new JSONData('object key', checkingValue.slice(0, checkingValue.indexOf(':')), []))
                continue;
            } else if (checkingValue === '}' || checkingValue === ']') {
                break;
            } else if (this.isBoolean(checkingValue)) {
                child.push(new JSONData('Boolean', checkingValue, []))
                continue;
            } else if (checkingValue === 'null') {
                child.push(new JSONData('Null', checkingValue, []))
                continue;
            } else if (this.isString(checkingValue)) {
                if (this.errorCheck.checkString(checkingValue)) return
                child.push(new JSONData('String', checkingValue, []))
                continue;
            }
            if (this.errorCheck.checkNumber(checkingValue)) return
            child.push(new JSONData('Number', checkingValue, []))
        }
        return child
    }

    isObjectKey(value) {
        return value.indexOf(':') !== -1 
    }

    isBoolean(value) {
        return value === 'true' || value === 'false'
    }

    isString(value) {
        return value[0] === "'"
    }
};

class ErrorCheck {
    countLetterNum(token, letter) {
        let lettersNum = 0
        for(let position of token) {
            if(position === letter) {
                quotesNum++
            }
        }
        return lettersNum
    }

    checkString(token) {
        let quotesNum = this.countLetterNum(token, "'")
        if (quotesNum === 2 && token[0] === "'" && token[token.length - 1] === "'") {
            return false
        }
        this.printErrorMessage('string', token)
        return true
    }
    
    checkNumber(token) {
        if (isNaN(Number(token))) {
            this.printErrorMessage('number', token)
            return true
        }
        return false
    }

    checkArray(wholeDataQueue) {
        
        wholeDataQueue.filter(v => {

        })
    }

    checkObject(wholeDataQueue) {

    }

    checkObjectKeys(wholeDataQueue) {

    }

    checkComma(wholeDataQueue) {

    }

    printErrorMessage(type, token) {
        if(type === 'string') {
            console.log(`${token}는 제대로된 문자열이 아닙니다.`)
        }
        if(type === 'number') {
            console.log(`${token}은 알수없는 데이터입니다.`)
        }
    }
};

const print = function printJSONData(JSONData) {
    console.log(JSON.stringify(JSONData, null, 2))
}

const tokenize = new Tokenize
const tokenizedDataArr = tokenize.getWholeDataQueue(sentence)
const errorCheck = new ErrorCheck
const analyze = new Analyze(tokenizedDataArr, errorCheck)
const jsonData = analyze.queue()
print(jsonData)

