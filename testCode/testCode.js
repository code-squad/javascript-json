const Analyze = require('../script/analyze')
const ErrorCheck = require('../script/errorCheck.js')
const Tokenize = require('../tokenize')
const JSONData = require('../script/jsonData')

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




