class Tokenizer {
    insertComma(str) {
        return str.replace(/\[/g, '[,').replace(/\]/g, ',]').replace(/\{/g, '{,').replace(/\}/g, ',}').replace(/\:/g, ':,');
    }

    removeSpace(str) {
        return str.split(' ').join('');
    }

    getTokens(str, seperator) {
        str = this.insertComma(str);
        return this.removeSpace(str).split(seperator);
    }
}

module.exports = Tokenizer;