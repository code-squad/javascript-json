const Analyze = require('../script/analyze')
const ErrorCheck = require('../script/errorCheck.js')
const Tokenize = require('../script/tokenize')
const JSONData = require('../script/jsonData')
const analyze = new Analyze
const errorCheck = new ErrorCheck
const tokenize = new Tokenize

const checkObj = {
    value: null,

    toBe(value) {
        if (value === this.value) {
            return 'OK'
        } else {
            return `FAIL (나온 값 : ${value}, 나와야하는 값 : ${this.value})`
        }
    }
}

function expect(value) {
    checkObj.value = value
    return checkObj
}

function test(message, method) {
    console.log(`${message} : ${method()}`)
}

test('객체의 key데이터인지 확인한다.', function() {
    const data = "hellow:"
    const result = analyze.isObjectKey(data)
    return expect(true).toBe(result)
})


