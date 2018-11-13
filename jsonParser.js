class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const sentence = "[123,[22,[33]],44,[1,2,3],11]".replace(/ /gi, '')

class Tokenize {
    constructor() {
        this.wholeDataQueue = [];
    }
    
    updateWholeDataQueue(sentence) {
        while(sentence.length !== 0) {
            const token = this.getToken(sentence)
            this.wholeDataQueue.push(token)
            sentence = sentence.replace(token, '')
        }
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
// function arrayParser(arr) {
//     const wholeDataQueue = [];
//     while (arr.length !== 0) {
//         //토큰 자르고 토큰wholeDataqueue 에 넣고
//         const token = getToken(arr)
//         wholeDataQueue.push(token)
//         arr = arr.replace(token, '')
//     }
//     const analyzedQueue = analyzeQueue(wholeDataQueue)
//     return analyzedQueue
// }
// function getToken(str) {
//     //, [ or ]가 나오면 따로뽑아냄
//     if (str[0] === '[' || str[0] === ',' || str[0] === ']') {
//         return str.slice(0, 1)
//     } else if (str.indexOf(']') < str.indexOf(',')) {
//         return str.slice(0, str.indexOf(']'))
//     } else if (str.indexOf(',') === -1) {
//         return str.slice(0, str.indexOf(']'))
//     } else {
//         return str.slice(0, str.indexOf(','))
//     }
// }

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
            }
            child.push(new JSONData('Number', checkingValue, []))
        }
        return child
    }
}
// function analyzeQueue(queueArr) {
//     while (queueArr.length !== 0) {
//         const value = queueArr.shift()
//         if (value === '[') {
//             const child = getChild(queueArr, value)
//             return new JSONData('array', 'array Object', child)
//         }
//     }
// }

// function getChild(queueArr, valueIn) {
//     let child = []
//     while (valueIn !== ']') {
//         let valueIn = queueArr.shift()
//         if (valueIn === '[') {
//             child.push(new JSONData('Array', 'object Array', getChild(queueArr, valueIn)))
//             continue;
//         } else if (valueIn === ',') {
//             continue;
//         } else if (valueIn === ']') {
//             break;
//         }
//         child.push(new JSONData('Number', valueIn, []))
//     }
//     return child
// }

function printJSONData(JSONData) {
    console.log(JSON.stringify(JSONData, null, 2))
}

const tokenize = new Tokenize
tokenize.updateWholeDataQueue(sentence)
const analyze = new Analyze(tokenize.wholeDataQueue)
const jsonData = analyze.queue()
printJSONData(jsonData)