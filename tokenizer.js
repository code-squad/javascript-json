class Tokenizer {
    constructor() {
        this.tokenList = [];
        this.token = '';
        this.bStr = false;
        this.bStrOpen = false;
        this.arrayStack = [];
        this.objectStack = [];
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
                if (char === '[') this.arrayStack.push('[');
                if (char === '{') this.objectStack.push('{');

                this.concat(this.token, char);
                this.push(this.token.trim());
                this.initToken();
            }
            else if (char.match(/,|\]|\}/)) {
                if (this.bStrOpen) this.error.throwWrongString(this.token);
                if (this.token) this.push(this.token.trim());
                if (char !== ',') this.push(char);
                if (char === ']') this.arrayStack.pop();

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
        if (this.objectStack.length) this.error.throwWrongObject();
        if (this.arrayStack.length) this.error.throwWrongArray();

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
}

const tokenizer = new Tokenizer;
const str = "['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]";
console.log(tokenizer.run(str));