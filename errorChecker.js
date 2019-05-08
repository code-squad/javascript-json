class ErrorChecker {
    checkOpenBracket(tokens) {
        let openArrCount = 0;
        let openObjCount = 0;
        for(let token of tokens) {
            if(token === '[') openArrCount++;
            if(token === ']') openArrCount--;
            if(token === '{') openObjCount++;
            if(token === '}') openObjCount--;
        }
        if(openArrCount) throw Error('올바르지 않은 배열이 포함되어 있습니다.')
        if(openObjCount) throw Error('올바르지 않은 객체가 포함되어 있습니다.')
    }

}

module.exports = ErrorChecker;