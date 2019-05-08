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
    return tokens.reduce((lexedTokens, value) => {
            if(value === '[') {
                const arrayNode = new Node('array');
                delete arrayNode['value'];
                return lexedTokens.concat(arrayNode);
            } else if(!Number.isNaN(parseInt(value))) {
                return lexedTokens.concat(new Node('number', value));
            }
            return lexedTokens.concat(new Node(undefined, value));
        }, []);
}


function parse(lexedTokens) {
    let parentNode = {};
    lexedTokens.forEach(function (lexedToken) {
        if(lexedToken.type === 'array') {
            parentNode = lexedToken;
        } else if(lexedToken.type === 'number') {
            parentNode.child.push(lexedToken);
        }
        return parentNode;
    });
    return parentNode;
}

const str = "[1.23, 2.2, 3.3]";
const tokens = tokenize(str);
const lexedTokens = lex(tokens);
const result = parse(lexedTokens);
console.log(JSON.stringify(result, null, 2));