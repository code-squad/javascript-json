const tokenizer = str => {
    const separator = ',';
    const temp = str.split(separator);
    const tokens = [];

    for (let token of temp) {
        if (token.indexOf('[') === 0 && token.indexOf(']') === token.length-1) {
            tokens.push('[');
            tokens.push(token.trim().substr(1, token.length-2));
            tokens.push(']');
        } else if (token.indexOf('[') === 0) {
            tokens.push('[');
            tokens.push(token.trim().substr(1));
        } else if (token.indexOf(']') === token.length-1) {
            tokens.push(token.trim().substr(0, token.length-1));
            tokens.push(']');
        } else {
            tokens.push(token.trim());
        }
    }

    return tokens;
}

const lexer = () => {  

}

const arrayParser = () => {

}

var s = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";

console.log(tokenizer(s));