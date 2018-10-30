module.exports = class Tokenizer {
    constructor() {
        this.tokenList = [];
        this.token = '';
        this.bStr = false;
        this.bStrOpen = false;
        this.arrayStack = 0;
        this.objectStack = 0;
        this.bKeyAvailable = false;
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

    processByType(char) {
        const self = this;
        const type = {
            '['() {
                self.arrayStack++;
            },
            '{'() {
                self.objectStack++;
                self.bKeyAvailable = !self.bKeyAvailable;
            },
            ':'() {
                self.bKeyAvailable = !self.bKeyAvailable;
            },
            ','() {
                if (!self.token.trim()) self.error.throwWrongComma();
                if (self.objectStack) self.bKeyAvailable = !self.bKeyAvailable;
            },
            ']'() {
                if (!self.arrayStack) self.error.throwWrongArray();
                else self.arrayStack--;
            },
            '}'() {
                if (self.bKeyAvailable) self.error.throwMissingColon();

                if (!self.objectStack) self.error.throwWrongObject();
                else self.objectStack--;
            }
        }
        type[char]();
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
                this.processByType(char);

                this.concat(this.token, char);
                this.push(this.token.trim());
                this.initToken();
            }
            else if (char.match(/,|\]|\}/)) {
                this.processByType(char);

                if (this.bStrOpen) this.error.throwWrongString(this.token);
                if (this.token) this.push(this.token.trim());

                this.initToken();
                if (char !== ',') this.token += char;
                this.bStr = false;
            }
            else {
                if (char === "'") this.bStrOpen = !this.bStrOpen;
                if (this.bStr && this.bStrOpen) this.error.throwWrongString(this.token);

                this.concat(this.token, char);
            }
        }

        //error 검출
        if (this.bStrOpen) this.error.throwWrongString(this.token);
        if (this.objectStack) this.error.throwWrongObject();
        if (this.arrayStack) this.error.throwWrongArray();

        if (this.token) this.push(this.token.trim());


        return this.tokenList;
    }
}

class Error {
    throwWrongString(string) {
        throw `${string}은 올바른 문자열이 아닙니다.`;
    }

    throwWrongArray() {
        throw `정상적으로 종료되지 않은 배열이 있습니다.`;
    }

    throwWrongObject() {
        throw `정상적으로 종료되지 않은 객체가 있습니다.`;
    }

    throwMissingColon() {
        throw `':'이 누락된 객체표현이 있습니다.`;
    }

    throwWrongComma() {
        throw `연속된 ','가 존재합니다.`
    }
}

// const tokenizer = new Tokenizer;
// const str = "['1a3',[null,false,['11',112,'99', {a:'str', b: [912,[5656,33]]}], true]]";
// console.log(tokenizer.run(str));