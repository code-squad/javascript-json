const Stack = require('./stack');

const ArrayParser = class {
    
    constructor(string) {
        this.string = string;
    }  

    get charType() {
        return {
            tokenArr : [',','[',']'],
            bracketArr : ['[', ']'],
            stringArr : ['\'','\"'],
        }
    }

    pushAndResetToken(token, tokenArr) {
        if (token !== ``) {
            tokenArr.push(token.trim());
        }
        return token = ``;
    }

    isSameQuote(quote, quoteStack) {
        return quote === quoteStack.peek();
    }
}

module.exports = ArrayParser;
