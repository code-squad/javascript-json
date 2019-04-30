const str = "[123, 22, 33]";
class Tokenizer {
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