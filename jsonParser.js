class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}
const array = '[123,[11, 22],33]'

//토큰을 구별해내는 함수, 토큰을 분석하는 함수
function arrayParser(array) {
    while(array.length === 0) {

    }
}

function judgeToken(value) {
    if(value.indexOf(',') === -1) {
        return value
    }else if(value[0] === '[') {
        return value.slice(1, value.lastIndexOf(']'))
    }
    return value.slice(0, value.indexOf(','))
}

function analyzeToken(token) {
    const value = judgeToken(token)
}

function getValue(str) {
    if (str.indexOf('[') !== -1) {
        return str.slice(str.indexOf('[') + 1, str.lastIndexOf(']'))
    } else {
        return str.slice(0, str.length)
    }
}

function getChild(str) {
    child = []
    while (str.indexOf(',') !== -1) {
        var value = str.slice(0, str.indexOf(','))
        child.push(new JSONData(getType(value), value, []))
        str = str.slice(str.indexOf(',') + 1, str.length)
        if (str.indexOf(',') === -1) {
            child.push(new JSONData(getType(str), str, []))
        }
        console.log(str)
    }
    return child
}

function printResult(result) {
    console.log(result)
}

