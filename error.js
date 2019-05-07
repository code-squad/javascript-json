module.exports = {
    errorComment: {
        ininvalidString: '올바른 문자열이 아닙니다.',
        invalidType: '올바른 타입이 아닙니다.'
    },

    stringValidator: function(tokenizedArr) {
        isString = true;
        tokenizedArr.forEach( word => {
            if(word.startsWith("'") && word.endsWith("'")) {
                for(let i = 1; i < word.length-1; i++) {
                    if(word[i] === "'") isString = false
                }
            }
        });
        if(!isString) throw new Error(this.errorComment.invalidString);
    },

    typeValidator: function(lexedArr, indexOfType=0, indexOfData=1) {
        const stringTypes = lexedArr.filter( dataArr => {
            return dataArr[indexOfType] === 'string'
        })
        
        const isValidType = stringTypes.every( dataArr => {
            const data = dataArr[indexOfData];
            if(data.startsWith("'") && data.endsWith("'")) return true;
            let isValid = true; 
            for(const letter of data){
                const isNumber = Number(letter)
                if(!isNaN(isNumber)) isValid = false;
                console.log(isNaN(isNumber))
            }
            return isValid;
        })
        if(!isValidType) throw new Error(this.errorComment.invalidType)
    }
}