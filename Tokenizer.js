module.exports = class Tokenizer{
    constructor(){
        this.tokenQueue = [];
        this.input;
        this.tempToken = '';
        this.curChar='';
    }

    isQuote(char){
        const quotes = ['\'','\"'];
        return quotes.includes(char)
    }

    beforeHasComma(string){
        return this.isQuote(string[0]);
    }

    isEndSeparator(char){
        const endOperator = [']','}',':',','];
        return endOperator.includes(char)
    }

    isTokenSeparator(char){
        const separator = ['[',']','{','}',':'];
        return separator.includes(char);
    }

    pushCharAndRenewTempToken(){
        this.tempToken += this.curChar;
        this.tokenQueue.push(this.tempToken.trim());
        this.tempToken = '';
    }

    cutInput(input){
        this.input = input.split("");
        while(this.input.length){
            this.curChar = this.input.shift();
            const nextChar = this.input[0];

            if(this.isEndSeparator(nextChar)){
                this.pushCharAndRenewTempToken()
                continue
            }
            
            if(this.beforeHasComma(this.tempToken)){
                this.tempToken += this.curChar;
                continue 
            }

            if(this.isTokenSeparator(this.curChar)){
                this.pushCharAndRenewTempToken()
                continue
            }

            if(this.curChar === ','){
                continue
            }

            this.tempToken += this.curChar;
        }
        return this.tokenQueue
    }
}

