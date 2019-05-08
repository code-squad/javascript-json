class Node {
    constructor(type, value) {
        this.type   = type;
        this.value  = value;
        this.child  = [];
    }
}

function tokenize(string) {
    const noWhiteSpaceString = string.replace(/ /g, '');
    return noWhiteSpaceString.split(/([\[\]])|,/).filter((value) => {return value});
}

function lex(tokens) {
    return tokens.reduce((lexedTokens, value) => {
            if(value === '[') {
                return lexedTokens.concat(new Node('array', value));
            } else if(!Number.isNaN(parseInt(value))) {
                return lexedTokens.concat(new Node('number', value));        
            }
            return lexedTokens.concat(new Node(undefined, value));
        }, []);
}

const str = "[1.23, 2.2, 3.3]";
const tokens = tokenize(str);
const lexedTokens = lex(tokens);