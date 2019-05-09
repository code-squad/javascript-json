const tokenizer = str => {
    const separator = ',';
    const temp = str.split(separator);
    const tokens = [];

    for (let token of temp) {
        if (token.indexOf('[') !== -1 && token.indexOf(']') !== -1) {
            tokens.push('[');
            tokens.push(token.trim().substr(token.indexOf('[')+1, token.indexOf(']')-1));
            tokens.push(']');
        } else if (token.indexOf('[') !== -1) {
            tokens.push('[');
            tokens.push(token.trim().substr(token.indexOf('[')+1));
        } else if (token.indexOf(']') !== -1) {
            tokens.push(token.trim().substring(0, token.indexOf(']')));
            tokens.push(']');
        } else {
            tokens.push(token.trim());
        }
    }

    return tokens;
}

const lexer = (str) => {  
    const temp = tokenizer(str);
    const tokens = temp.map( token => {
        return getType(token);
    });
    return tokens;
}

const getType = (token) => {
    if (!isNaN(Number(token))) {
        return {type: 'number', value: Number(token)};
    } else if (token === 'true' || token === 'false') {
        return {type: 'boolean', value: Boolean(token)};
    } else if (token === 'null') {
        return {type: 'null', value: null};
    } else if (token ==='[') {
        return {type: 'array', value: token};
    } else if (token === ']') {
        return {type: 'array', value: token};
    } else if (token.substr(1, token.length-2).indexOf('\'') !== -1) {
        console.error(`${token}은 올바른 문자열이 아닙니다.`);
    } else if (token.substr(1, token.length-2).indexOf('\"') !== -1) {
        console.error(`${token}은 올바른 문자열이 아닙니다.`);
    } else if (typeof(token) === "string") {
        return {type: 'string', value: token};
    } else {
        console.error(`${token}은 알 수 없는 타입입니다.`);
    }
}

const arrayParser = () => {

}

var s1 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
var s2 = "['1a'3',[22,23,[11,[112233],112],55],33]";

console.log(s1.split(','));
console.log(tokenizer(s1));

