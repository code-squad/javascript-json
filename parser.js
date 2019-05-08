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
    return tokens.reduce((lexedTokens, value) => {
            if(value === '[') {
                const arrayNode = new Node('array');
                delete arrayNode['value'];
                return lexedTokens.concat(arrayNode);
            } else if(isNumber(value)) {
                return lexedTokens.concat(new Node('number', value));
            }
            return lexedTokens.concat(new Node(undefined, value));
        }, []);
}


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
const result = parse(lexedTokens);
console.log(JSON.stringify(result, null, 2));