module.exports = class Tokenizer {
    constructor() {
        this.tokenList = [];
        this.token = '';
        this.bStr = false;
        this.bStrOpen = false;
        this.error = new Error;
    }
    push(token) {
        this.tokenList.push(token);
    }
    initToken() {
        this.token = '';
    }
    concat(token, char) {
        this.token = token + char;
    }
    run(str) {
        for (let char of str) {
            if (this.bStrOpen) {
                if (char === "'") {
                    this.bStr = !this.bStr;
                    this.bStrOpen = !this.bStrOpen;
                }
                this.concat(this.token, char);
            }
            else if (char.match(/\[|\{|\:/)) {
                this.concat(this.token, char);
                this.push(this.token.trim());
                this.initToken();
            }
            else if (char.match(/,|\]|\}/)) {
                if (this.bStrOpen) this.error.throwWrongString(this.token);
                if (this.token) this.push(this.token.trim());
                if (char !== ',') this.push(char);

                this.initToken();
                this.bStr = false;
            }
            else {
                if (char === "'") this.bStrOpen = !this.bStrOpen;
                this.concat(this.token, char);

                if (this.bStr && this.bStrOpen) this.error.throwWrongString(this.token);
            }
        }

        //올바르지 않은 문자열 검출
        if (this.bStrOpen) this.error.throwWrongString(this.token);
        if (this.token) this.push(this.token.trim());

        return this.tokenList;
    }
}

class Error {
    throwWrongString(string) {
        throw `${string}은 올바른 문자열이 아닙니다.`;
    }
}