class ErrorChecker {
    isInvalidArray(tokens) {
        let count = 0;
        for(let token of tokens) {
            if(token === '[') count++;
            if(token === ']') count--;
        }
        return count || false;
    }
    
    isInvalidObject(tokens) {
        let count = 0;
        for(let token of tokens) {
            if(token === '{') count++;
            if(token === '}') count--;
        }
        return count || false;

    }
}

module.exports = ErrorChecker;