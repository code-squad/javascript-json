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
        this.value = value;
    }

    getType(token) {
        if (token === '[') return 'arrayOpen';
        if (token === ']') return 'arrayClose';
        if (token === 'null') return 'null';
        if (token === 'true' | 'false') return 'boolean';
        if (token.match(/[^0-9|^.]/)) return 'number';
        if (token.match(/'.+?'/)) return 'string';
    }
}