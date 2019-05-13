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

    get makeStringToken() {
        return (stringPropertyArr, tokenArr, token, char) => {
            if (stringPropertyArr.includes(token[0])) {
                if (token[0] === (token[token.length-1])) {
                    token = this.pushAndResetToken(token, tokenArr);
                } else {
                    token+=char;
                }
            } else {
                token = this.pushAndResetToken(token, tokenArr);
            }
            return token;
        }
    }

    tokenizer() {
        let token = ``;
        const tokenArr = [];
        const quoteStack = new Stack();
        
        this.string.split("").forEach((char) => {
            this.pushQuoteStack(char, quoteStack, this.charType.stringArr);

            if (this.charType.tokenArr.includes(char) && quoteStack.isEmpty()) {
                token = this.makeStringToken(this.charType.stringArr, tokenArr, token, char);
                this.pushBracket(char, tokenArr, this.charType.bracketArr);
            } else {
                token+=char;
            }
        })
        return tokenArr;
    }


    

}

module.exports = ArrayParser;
