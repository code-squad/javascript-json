const separators = require('./helper/separators');
const errorChecker = require('./error/error');

class Lexer {
    constructor(tokenizedList) {
        this.tokenizedList = tokenizedList;
    }
        
    lexing() {
        this.isValidTokenList(this.tokenizedList);
        const newLexedList = this.tokenizedList.map( (token, idx, arr) => {
            if(arr[idx+1] === ':') return this.makeNode({type: 'key', value: token});
            const type = this.getType(token);
            return this.makeNode({type, value: token});
        });
        return newLexedList;
    }

    makeNode({type, value}) {
        if(type === 'number') value = Number(value);
        return {
            type,
            value
        }
    }

    getType(token) {
        if(separators.hasOwnProperty(token)) return separators[token]; 
        if(token === 'null') return 'null';
        if(token === 'true' || token === 'false') return 'boolean';
        if(!isNaN(token*1)) return 'number'
        return typeof token;
    }

    isValidTokenList(tokenizedList) {
        errorChecker.isData(tokenizedList);        
        errorChecker.dataValidator(tokenizedList);
        errorChecker.stringValidator(tokenizedList);
        errorChecker.separatorChecker(tokenizedList);
    }
}



module.exports = Lexer;