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

function isNumber(value) {
    if(Number.isNaN(parseInt(value))) return false;
    return true;
}

function lex(tokens) {
    let token = {};
    return tokens.reduce((lexedTokens, value) => {
            if(value === '[') {
                token = {'name' : 'ArrayOpener', 'value' : value}
                return lexedTokens.concat(token);
            } else if(isNumber(value)) {
                token = {'name' : 'Number', 'value' : value}
                return lexedTokens.concat(token);
            } else if(value === ']') {
                token = {'name' : 'ArrayCloser', 'value' : value}
                return lexedTokens.concat(token);
            }
        }, []);
}

//사용 불가, Todo : lexedTokens 가 변경되었으므로 각 lexedToken의 node를 만들도록 수정할것.
function parse(lexedTokens) {
    let parentNode = {};
    lexedTokens.forEach((lexedToken) => {
        if(lexedToken.type === 'array') {
            parentNode = lexedToken;
        } else if(lexedToken.type === 'number') {
            parentNode.child.push(lexedToken);
        }
        return parentNode;
    });
    return parentNode;
}

const str = "[123, 22, 33]";
const tokens = tokenize(str);
const lexedTokens = lex(tokens);