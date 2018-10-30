class Tokenizer {
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
                if (char === '[') this.arrayStack++;
                if (char === '{') {
                    this.objectStack++;
                    this.bKeyAvailable = !this.bKeyAvailable;
                }
                if (char === ':') this.bKeyAvailable = !this.bKeyAvailable;

                this.concat(this.token, char);
                this.push(this.token.trim());
                this.initToken();
            }
            else if (char.match(/,|\]|\}/)) {
                if (this.bStrOpen) this.error.throwWrongString(this.token);
                if (this.objectStack && char === ',') this.bKeyAvailable = !this.bKeyAvailable;
                if (char === ']') !this.arrayStack ? this.error.throwWrongArray() : this.arrayStack--;
                if (char === '}') {
                    if (!this.objectStack) this.error.throwWrongObject();
                    else this.objectStack--;

                    if (this.bKeyAvailable) this.error.throwMissingColon();
                }

                if (this.token) this.push(this.token.trim());
                if (char !== ',') this.push(char);

                this.initToken();
                this.bStr = false;
            }
            else {
                if (char === "'") this.bStrOpen = !this.bStrOpen;
                if (this.bStr && this.bStrOpen) this.error.throwWrongString(this.token);

                this.concat(this.token, char);
            }
        }

        //올바르지 않은 문자열 검출
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
}

const tokenizer = new Tokenizer;
const str = "['1a3',[null,false,['11',112,'99' , {a:'str', b [912,[5656,33]]}, true]";
console.log(tokenizer.run(str));