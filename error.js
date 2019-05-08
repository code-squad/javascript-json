module.exports = {
    errorComment: {
        invalidString: '올바른 문자열이 아닙니다.',
        invalidType: '올바른 타입이 아닙니다.',
        invalidData: '올바른 data형식이 아닙니다.',
        noData: 'Parsing할 수 있는 data가 없습니다.'
    },

    stringValidator: function(tokenizedArr) {
        let isString = true;
        tokenizedArr.forEach( word => {
            for(let i = 1; i < word.length-1; i++) {
                if(word[i] === "'") isString = false
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
            }
            return isValid;
        })
        if(!isValidType) throw new Error(this.errorComment.invalidType)
    },

    dataValidator: function(tokenizedItems) {
        const firstIndex = 0;
        const lastIndex = tokenizedItems.length
        if(tokenizedItems.indexOf("[") !== firstIndex || 
           tokenizedItems.lastIndexOf("]") !== lastIndex-1){
               throw new Error(this.errorComment.invalidData);
           }
    },

    doesDataExist: function(inputString) {
        if(inputString === undefined) throw new Error(this.errorComment.noData);
    }
}