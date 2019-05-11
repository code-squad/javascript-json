const errorMessage = require('./error_message');

const validation = {
    checkValidation(lexedTokens) {
        if(!(this.checkNotSupportDataType(lexedTokens))) return false;
        if(!(this.checkNotHaveInitialArray(lexedTokens))) return false;
        if(!(this.checkMatchArraySquares(lexedTokens))) return false;
        if(!(this.checkStringConvention(lexedTokens))) return false;
        return true;
    },
    
    checkNotSupportDataType(tokens) {
        const countUndefinedTokens = tokens.filter((token) => token.name === undefined).length;
        if(countUndefinedTokens) {
            console.log(errorMessage.notHaveDataType);
            return false;
        }
        return true;
    },

    checkNotHaveInitialArray(tokens) {
        if(!(tokens[0].name === 'arrayOpener')) {
            console.log(errorMessage.notHaveInitialArray);
            return false;
        }
        return true;
    },

    checkMatchArraySquares(tokens) {
        const countArrayOpeners = tokens.filter((token) => token.name === 'arrayOpener').length;
        const countArrayClosers = tokens.filter((token) => token.name === 'arrayCloser').length;
        if(!(countArrayOpeners === countArrayClosers)) {
            console.log(errorMessage.arrayNotMatched);
            return false;
        }
        return true;
    },

    checkStringConvention(tokens) {
        const stringTokens = tokens.filter((token) => token.name === 'string');
        for(let stringToken of stringTokens) {
            if(stringToken.value.startsWith("'") && !(stringToken.value.match(/'/g).length === 2)) {
                console.log(errorMessage.stringConventionError);
                return false
            } else if(stringToken.value.startsWith('"') && !(stringToken.value.match(/"/g).length === 2)) {
                console.log(errorMessage.stringConventionError);
                return false
            }
            return true;
        }
    }
}
module.exports = validation;