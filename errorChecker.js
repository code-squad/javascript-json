class ErrorChecker {
    checkBrackets(tokens) {
        let openArrCount = 0;
        let openObjCount = 0;
        for(let token of tokens) {
            if(token === '[') openArrCount++;
            if(token === ']') openArrCount--;
            if(token === '{') openObjCount++;
            if(token === '}') openObjCount--;
        }
        if(openArrCount) throw Error('올바르지 않은 배열표현이 포함되어 있습니다.')
        if(openObjCount) throw Error('올바르지 않은 객체표현이 포함되어 있습니다.')
    }

    checkNodes(nodes) {
        for(let node of nodes) {
            if(node.type === 'withSpace') throw Error(`${node.value} 는 콜론(:)이 누락된 객체표현이거나 공백이 포함된 데이터표현입니다.`)
            if(node.type === 'wrongString') throw Error(`${node.value} 는 올바른 문자열이 아닙니다.`)
            if(node.type === 'unknownType') throw Error(`${node.value} 는 알 수 없는 타입입니다.`)
        }
    }
}

module.exports = ErrorChecker;