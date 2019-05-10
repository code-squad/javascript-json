class Node {
    constructor(type, value) {
        this.type   = type;
        this.value = value;
        this.child  = [];
    }
}

class ArrayParser {
    tokenize(string) {
        const noWhiteSpaceString = string.replace(/ /g, '');
        return noWhiteSpaceString.split(/([\[\]])|,/).filter((value) => value);
    }

    lex(tokens) {
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
                } else if(!(token.search(/'(.+)'/) === -1)) {
                    token = {'name' : 'string', 'value' : token};
                    return token;
                } else if(token === 'null') {
                    token = {'name' : 'null', 'value' : token};
                    return token;
                } else if(token === ']') {
                    token = {'name' : 'arrayCloser', 'value' : token};
                    return token;
                }
            }, []);
    }

    parse(lexedTokens) {
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

    run(string) {
        const tokens = this.tokenize(string);
        const lexedTokens = this.lex(tokens);
        return this.parse(lexedTokens);
    }
}

const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const arrayParser = new ArrayParser();
const result = arrayParser.run(str);
console.log(JSON.stringify(result, null, 2));