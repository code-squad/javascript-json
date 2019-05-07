const arrayParser = () => {

}

const tokenizer = str => {
    const separator = ', ';
    const temp = str.split(separator);
    const tokens = [];

    for (let token of temp) {
        if (token.indexOf('[') !== -1) {
            tokens.push('[');
            tokens.push(token.substr(1));
        } else if (token.indexOf(']') !== -1) {
            tokens.push(token.substr(0, token.length-1));
            tokens.push(']');
        } else {
            tokens.push(token);
        }
    }

    return tokens;
}

const lexer = str => {
    const temp = tokenizer(str);
    const tokens = temp.map( token => {
        if (token === '[') {
            return ['leftBracket', token];
        } else if (token === ']') {
            return ['rightBracket', token];
        }
        let type = typeof(Number(token));
        let value = Number(token);
        return [type, value];
    });
    return tokens;
}

const str = "[123, 22, 33]";
const result = arrayParser();
console.log(JSON.stringify(result, null, 2)); 