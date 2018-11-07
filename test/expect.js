const expect = function (data) {
    const expectValue = data;

    return expectation = {
        toBe(result) {
            if (Object.is(expectValue, result)) console.log('OK')
            else console.log(`FAIL (targetValue is ${result}, expectValue is ${expectValue})`)
        }
    }
}

module.exports = expect;