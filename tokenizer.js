class Tokenizer {
    insertCommaToBrackets(str) {
        return str.replace(/\[/g, '[,').replace(/\]/g, ',]');
    }

    removeSpace(str) {
        return str.split(' ').join('');
    }

    tokenizeByChar(str, char) {
        str = this.insertCommaToBrackets(str);
        return this.removeSpace(str).split(char);
    }
}

module.exports = Tokenizer;