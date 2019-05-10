class Tokenizer{
    removeWhiteSpace(input){
        let WHITESPACE = /\s/g;
        return input.replace(WHITESPACE, '');
    }

    splitByCommaAndBracket(input){
        return input.split(/([\[\]])|,/).filter(Boolean);
    }

    tokenize(input){
        return this.splitByCommaAndBracket(this.removeWhiteSpace(input));
    }
}

module.exports = Tokenizer;