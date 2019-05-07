class Tokenizer{
    removeWhiteSpace(input){
        let WHITESPACE = /\s/g;
        input = input.replace(WHITESPACE, '');
        return input;
    }

    splitByCommaAndBracket(input){
        input = input.split(/([\[\]])|,/).filter(Boolean);
        return input;
    }

    tokenize(input){
        const tokens = this.splitByCommaAndBracket(this.removeWhiteSpace(input));
        return tokens;
    }
}

module.exports = Tokenizer;