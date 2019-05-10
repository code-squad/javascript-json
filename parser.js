const errorMessage = require('./error_message')

class Node {
    constructor(type, value) {
        this.type   = type;
        this.value = value;
        this.child  = [];
    }
}

class ArrayParser {
    //Todo : String 에 ',' ' ' '[]' 포함하면 ...?, 마지막에 시간 남으면 해보기.
    static tokenize(string) {
        const noWhiteSpaceString = string.replace(/ /g, '');
        return noWhiteSpaceString.split(/([\[\]])|,/).filter((value) => value);
    }

    static attatchNameToTokens(tokens) {
        return tokens.map((token) => {
            if(token === '[') {
                token = {'name' : 'arrayOpener', 'value' : token};
                return token;
            } else if(!isNaN(token)) {
                token = {'name' : 'number', 'value' : token};
                return token;
            } else if(token === 'true' || token === 'false') {
                token = {'name' : 'boolean', 'value' : token};
                return token;
            } else if(!(token.search(/[',"].+[',"]/) === -1)) {
                token = {'name' : 'string', 'value' : token};
                return token;
            } else if(token === 'null') {
                token = {'name' : 'null', 'value' : token};
                return token;
            } else if(token === ']') {
                token = {'name' : 'arrayCloser', 'value' : token};
                return token;
            } else {
                token = {'name' : undefined, 'value' : token};
                return token;
            }
        }, []);
    }
    static checkMatchArraySquares(tokens) {
        const countArrayOpeners = tokens.filter((token) => token.name === 'arrayOpener').length;
        const countArrayClosers = tokens.filter((token) => token.name === 'arrayCloser').length;
        if(!(countArrayOpeners === countArrayClosers)) {
            console.log(errorMessage.arrayNotMatched);
        }
        return false;
    }

    static checkValidation(lexedTokens) {
        if(!this.checkMatchArraySquares(lexedTokens)) return;   
    }

    static lex(tokens) {
        const lexedTokens = this.attatchNameToTokens(tokens)
        if(!this.checkValidation(lexedTokens)) return;
        return lexedTokens;
    }

    static parse(lexedTokens) {
        const parentNodes = [];
        let [parentNode, arrayElement, countParentNodes] = [{}, {}, 0];

        lexedTokens.forEach((lexedToken) => {
            if(lexedToken.name === 'arrayOpener') {
                const arrayNode = new Node('array');
                delete arrayNode.value;
                parentNode = arrayNode;
                parentNodes.push(parentNode);
            } else if(lexedToken.name === 'arrayCloser') {
                arrayElement = parentNodes.pop();
                countParentNodes = parentNodes.length;
                if(!(countParentNodes === 0)) {
                    parentNode = parentNodes[countParentNodes-1];
                    parentNode.child.push(arrayElement);
                }
                return;
            } else {
                const elementNode = new Node(lexedToken.name, lexedToken.value);
                parentNode.child.push(elementNode);
            }
        });
        return parentNode;
    }

    static run(string) {
        const tokens = this.tokenize(string);
        const lexedTokens = this.lex(tokens);
        return this.parse(lexedTokens);
    }
}

//const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const str = "[]]";
const result = ArrayParser.run(str);
console.log(JSON.stringify(result, null, 2));