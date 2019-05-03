class Tokenizer {
    insertCommaToBrackets(str) {
        str = str.replace(/\[/g, '[,');
        str = str.replace(/\]/g, ',]');
        return str;
    }

    removeSpace(str) {
        let arr = str.split(' ');
        str = arr.join('');
        return str;
    }

    tokenizeByChar(str, char) {
        str = this.insertCommaToBrackets(str);
        str = this.removeSpace(str);
        const tokens = str.split(char);
        return tokens;
    }
}

module.exports = Tokenizer;