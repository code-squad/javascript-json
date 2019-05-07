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

const lexer = (str) => {  
    const temp = tokenizer(str);
    const tokens = [];

}

const checkType = (token) => {
    if (typeof(Number(token)) === 'number') {
        return 'number';
    } else if (Boolean(token) === true || Boolean(token) === false) {
        return 'boolean';
    } else if (token === 'null') {
        return 'null';
    } else if (token.substr(1, token.length-2).indexOf('\'') !== -1) {
        console.error(`${token}은 올바른 문자열이 아닙니다.`);
    } else if (token.substr(1, token.length-2).indexOf('\"') !== -1) {
        console.error(`${token}은 올바른 문자열이 아닙니다.`);
    } else if (typeof(token) === "string") {
        return 'string';
    } else {
        console.error(`${token}은 알 수 없는 타입입니다.`);
    }
}

const arrayParser = () => {

}

var s1 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
var s2 = "['1a'3',[22,23,[11,[112233],112],55],33]";
console.log(tokenizer(s2));
