const errorMessage = require('./error_message');

const validation = {
    checkValidation(lexedTokens) {
        if(!(this.checkMatchArraySquares(lexedTokens))) return false;
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
    }
}

module.exports = validation;