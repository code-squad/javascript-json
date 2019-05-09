class Node {
    constructor(type, value) {
        this.type   = type;
        this.value = value;
        this.child  = [];
    }
}

function tokenize(string) {
    const noWhiteSpaceString = string.replace(/ /g, '');
    return noWhiteSpaceString.split(/([\[\]])|,/).filter((value) => {return value});
}

function lex(tokens) {
    let token = {};
    return tokens.reduce((lexedTokens, value) => {
            if(value === '[') {
                token = {'name' : 'ArrayOpener', 'value' : value}
                return lexedTokens.concat(token);
            } else if(!isNaN(value)) {
                token = {'name' : 'Number', 'value' : value}
                return lexedTokens.concat(token);
            } else if(value === ']') {
                token = {'name' : 'ArrayCloser', 'value' : value}
                return lexedTokens.concat(token);
            }
        }, []);
}

function parse(lexedTokens) {
    let parentNode = {};
    lexedTokens.forEach((lexedToken) => {
        if(lexedToken.name === 'ArrayOpener') {
            const arrayNode = new Node('array');
            delete arrayNode.value;
            parentNode = arrayNode;
        } else if(lexedToken.name === 'Number') {
            const numberNode = new Node('number', lexedToken.value);
            parentNode.child.push(numberNode);
        } else if(lexedToken.name === 'ArrayCloser') {
            return;
        }
    });
    return parentNode;
}

const str = "[123, 22, 33]";
const tokens = tokenize(str);
const lexedTokens = lex(tokens);
const result = parse(lexedTokens);

console.log(JSON.stringify(result, null, 2)); 