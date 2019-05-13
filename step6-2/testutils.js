const test = {

    logFail(actual, expected, testFunction) {
        // red color
        console.log('\u001b[31m' + `FAIL!! ${testFunction.name} 의 [[ ${actual} ]]이 기대값 ${expected}와 일치하지 않음` + '\u001b[0m')
        return false;
    },
    
    logSuccess(actual, expected, testFunction) {
        // green color
        console.log('\u001b[32m' + `SUCCESS!! ${testFunction.name} 의 [[ ${actual} ]]이 기대값 ${expected}와 일치` + '\u001b[0m')
        return true;
    },
}

module.exports = test;