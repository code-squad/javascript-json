class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const sentence = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]".replace(/ /gi, '')

class Tokenize {
    constructor() {
        this.wholeDataQueue = [];
    }
    
    getWholeDataQueue(sentence) {
        while(sentence.length !== 0) {
            const token = this.getToken(sentence)
            this.wholeDataQueue.push(token)
            sentence = sentence.replace(token, '')
        }
        return this.wholeDataQueue
    }

    getToken(str) {
        if (str[0] === '[' || str[0] === ',' || str[0] === ']') {
            return str.slice(0, 1)
        } else if (str.indexOf(']') < str.indexOf(',')) {
            return str.slice(0, str.indexOf(']'))
        } else if (str.indexOf(',') === -1) {
            return str.slice(0, str.indexOf(']'))
        } else {
            return str.slice(0, str.indexOf(','))
        }
    }
}

class Analyze {
    constructor(queue) {
        this.queueArr = queue
    }
    
    queue() {
        while(this.queueArr.length !== 0) {
            const value = this.queueArr.shift()
            if(value === '[') {
                const child = this.getChild(this.queueArr, value)
                return new JSONData('Array', 'Array Object', child)
            }
        }
    }

    getChild(queueArr, checkingValue) {
        let child = [];
        while (checkingValue !== ']') {
            checkingValue = queueArr.shift()
            if(checkingValue === '[') {
                child.push(new JSONData('Array', 'Object Array', this.getChild(queueArr, checkingValue)))
                continue;
            } else if (checkingValue === ',') {
                continue;
            } else if (checkingValue === ']') {
                break;
            } else if (checkingValue === 'true' || checkingValue === 'false') {
                console.log(checkingValue)
            } else if (checkingValue === 'null') {
                console.log(checkingValue)
            } else if (checkingValue[0] === "'") {
                console.log(checkingValue)
            }
            child.push(new JSONData('Number', checkingValue, []))
        }
        return child
    }

    errorCheck(token) {
        
    }
}

function printJSONData(JSONData) {
    console.log(JSON.stringify(JSONData, null, 2))
}

const tokenize = new Tokenize
const tokenizedDataArr = tokenize.getWholeDataQueue(sentence)
console.log(tokenizedDataArr)
const analyze = new Analyze(tokenizedDataArr)
const jsonData = analyze.queue()
printJSONData(jsonData)
