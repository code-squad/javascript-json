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

    get pushQuoteStack() {
        return (quote, quoteStack, stringPropertyArr) => {
            if (stringPropertyArr.includes(quote)) {
                if (quoteStack.isEmpty()) {
                    quoteStack.push(quote);
                } else {
                    if (this.isSameQuote(quote, quoteStack)) {
                        quoteStack.pop();
                    } else {
                        quoteStack.push(quote);
                    }
                }
            }
        }
    }

    get pushBracket() {
        return (char, tokenArr, bracketPropertyArr) => {
            if (bracketPropertyArr.includes(char)) {
                tokenArr.push(char);
            }
        }
    }

    

}

module.exports = ArrayParser;
