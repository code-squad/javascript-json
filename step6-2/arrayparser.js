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

    get pushAndResetToken() {
        return (token, tokenArr) => {
            if (token !== ``) {
                tokenArr.push(token.trim());
            }
            return token = ``;
        }
    }

    get isSameQuote() {
        return (quote, quoteStack) => {
            return quote === quoteStack.peek();
        }
    }
}

module.exports = ArrayParser;
