class Tokenizer{
    removeWhiteSpace(input){
        let WHITESPACE = /\s/g;
        input = input.replace(WHITESPACE, '');
        return input;
    }
}