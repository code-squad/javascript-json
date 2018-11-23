const Analyze = require('../script/analyze')
const ErrorCheck = require('../script/errorCheck.js')
const Tokenize = require('../tokenize')
const JSONData = require('../script/jsonData')

const checkObj = {
    value: null,

    toBe(value) {
        if(value === this.value) {
            return true
        }
    }
}

function expect(value) {
    obj.value = value
    return obj
}



