module.exports = function lexer(tokens) {
    const lexemes = [];

    for (let token of tokens) {
        lexemes.push(new Lexeme(token));
    }

    return lexemes;
}

class Lexeme {
    constructor(token) {
        this.type = this.getType(token);
        this.value = this.getValue(this.type, token);
    }
}