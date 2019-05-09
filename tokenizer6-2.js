
class Tokenizer {
    constructor() {
        this.array = [];
        this.token = '';
    }

    // 실행 함수
    run(string) {
        string = string.split('');

        while (string.length > 0) {
            const onePiece = string.shift();

            if (this.isReadyToPushSomething(onePiece)) {
                this.pushOpenBracket(onePiece);
                this.pushCloseBracketAndIfTokenExistPushIt(onePiece);
                this.classifyValuesAndIfTokenExistPushIt(onePiece);
                this.token = '';
                continue;
            }

            this.makeToken(onePiece);
        }
        this.removeWhitespaceFromBothEndsOfTheArray();
        return this.array;
    }

    isReadyToPushSomething(onePiece) {
        return '[],'.includes(onePiece) ? true : false;
    }

    pushOpenBracket(onePiece) {
        if (onePiece === '[') this.array.push(onePiece);
    }

    pushCloseBracketAndIfTokenExistPushIt(onePiece) {
        if (onePiece === ']') {
            if (this.token !== '') this.array.push(this.token);
            this.array.push(onePiece);
        }
    }

    classifyValuesAndIfTokenExistPushIt(onePiece) {
        if (onePiece === ',') {
            if (this.token !== '') this.array.push(this.token);
        }
    }

    makeToken(onePiece) {
        this.token += onePiece;
    }

    removeWhitespaceFromBothEndsOfTheArray() {
        this.array = this.array.map(x => x.trim());
    }

}
const tokenizer = new Tokenizer();
const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"

console.log(tokenizer.run(str));