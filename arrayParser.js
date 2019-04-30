const str = "[123, 22, 33]";
class Tokenizer {
    seperateBrackets(str) {
        str = str.replace(/\[/g, '[,');
        str = str.replace(/\]/g, ',]');
        return str;
    }
    removeSpace(str) {
        let arr = str.split(',');
        arr = arr.map(el => el.trim());
        str = arr.join();
        return str;
    }
    tokenizeByChar(str, char) {
        str = this.seperateBrackets(str);
        str = this.removeSpace(str);
        const arr = str.split(char)
        return arr;
    }
}

class Lexer {
}

class ArrayParser {
    constructor(tokenizer, lexer) {
        this.tokenizer = tokenizer;
        this.lexer = lexer;
    }

}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser(tokenizer, lexer);

const result = arrayParser.parseToken(str);
console.log(result);