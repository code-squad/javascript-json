class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}
// 복잡한 세부로직은 반드시 함수로 분리해본다.
// 최대한 작은 단위의 함수로 만든다.
// 중복된 코드역시 함수로 분리해서 일반화한다.
// 객체형태의 class로 만든다. v
const sentence = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]".replace(/ /gi, '')
// const sentence = "'1a3',[null,false,['11',[112233],112],55, '99'],33, true]".replace(/ /gi, '')
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
        if (str[0] === '[' || str[0] === ',' || str[0] === ']' || str[0] === '{' || str[0] === '}') {
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
                return this.makeArrayChild(thid.queueArr, value)
            } else if (value === '{') {
                const objectChild = this.getChild(this.queueArr, value)
                return new JSONData('Object', 'Object Object', objectChild)
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
            if (checkingValue === '[') {
                child.push(new JSONData('Array', 'Object Array', this.getChild(queueArr, checkingValue)))
                continue;
            } else if (checkingValue === '{') {
                child.push(new JSONData('Object', 'Object Object', this.getChild(queueArr, checkingValue)))
                continue;
            } else if (checkingValue.indexOf(':') !== -1) {
                child.push(new JSONData('object key', checkingValue.slice(0, checkingValue.indexOf(':')), []))
                continue;
            } else if (checkingValue === '}') {
                break;
            } else if (checkingValue === ',') {
                continue;
            } else if (checkingValue === ']') {
                break;
            } else if (checkingValue === 'true' || checkingValue === 'false') {
                child.push(new JSONData('Boolean', checkingValue, []))
                continue;
            } else if (checkingValue === 'null') {
                child.push(new JSONData('Null', checkingValue, []))
                continue;
            } else if (checkingValue[0] === "'") {
                if (this.errorCheck.checkString(checkingValue)) {
                    console.log(`${checkingValue}는 제대로된 문자열이 아닙니다.`)
                    return
                }
                child.push(new JSONData('String', checkingValue, []))
                continue;
            }
            if (this.errorCheck.checkNumber(checkingValue)) {
                console.log(`${checkingValue}은 알수없는 문자열입니다.`)
                return
            }
            child.push(new JSONData('Number', checkingValue, []))
        }
        return child
    }
}

class ErrorCheck {
    checkString(token) {
        let quotesCount = 0
        for (let position of token) {
            if (position === "'") {
                quotesCount++
            }
        }
        if (quotesCount === 2 && token[0] === "'" && token[token.length - 1] === "'") {
            return false
        }
        return true
    }

    checkNumber(token) {
        if (isNaN(Number(token))) {
            return true
        }
        return false
    }
}

const print = function printJSONData(JSONData) {
    console.log(JSON.stringify(JSONData, null, 2))
}

const tokenize = new Tokenize
const tokenizedDataArr = tokenize.getWholeDataQueue(sentence)
const errorCheck = new ErrorCheck
const analyze = new Analyze(tokenizedDataArr, errorCheck)
const jsonData = analyze.queue()

print(jsonData)

