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
        let token = {};
        return tokens.reduce((acc, value) => {
                if(value === '[') {
                    token = {'name' : 'ArrayOpener', 'value' : value};
                    return acc.concat(token);
                } else if(!isNaN(value)) {
                    token = {'name' : 'Number', 'value' : value};
                    return acc.concat(token);
                } else if(value === 'true') {
                    token = {'name' : 'True', 'value' : value};
                    return acc.concat(token);
                } else if(value === 'false') {
                    token = {'name' : 'False', 'value' : value};
                    return acc.concat(token);
                } else if(!(value.search(/'(.+)'/) === -1)) {
                    token = {'name' : 'String', 'value' : value};
                    return acc.concat(token);
                } else if(value === 'null') {
                    token = {'name' : 'Null', 'value' : value};
                    return acc.concat(token);
                } else if(value === ']') {
                    token = {'name' : 'ArrayCloser', 'value' : value};
                    return acc.concat(token);
                }
            }, []);
    }

    parse(lexedTokens) {
        const parentNodes = [];
        let [parentNode, arrayElement, countParentNodes] = [{}, {}, 0];

        lexedTokens.forEach((lexedToken) => {
            if(lexedToken.name === 'ArrayOpener') {
                const arrayNode = new Node('array');
                delete arrayNode.value;
                parentNode = arrayNode;
                parentNodes.push(parentNode);
            } else if(lexedToken.name === 'Number') {
                const numberNode = new Node('number', lexedToken.value);
                parentNode.child.push(numberNode);
            } else if(lexedToken.name === 'String') {
                const numberNode = new Node('string', lexedToken.value);
                parentNode.child.push(numberNode);
            } else if(lexedToken.name === 'Null') {
                const numberNode = new Node('null', lexedToken.value);
                parentNode.child.push(numberNode);
            } else if(lexedToken.name === 'True' | lexedToken.name === 'False') {
                const numberNode = new Node('boolean', lexedToken.value);
                parentNode.child.push(numberNode);
            } else if(lexedToken.name === 'ArrayCloser') {
                arrayElement = parentNodes.pop();
                countParentNodes = parentNodes.length;
                if(!(countParentNodes === 0)) {
                    parentNode = parentNodes[countParentNodes-1];
                    parentNode.child.push(arrayElement);
                }
                return;
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