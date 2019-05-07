class Parser {
    constructor(tokensInArraysize) {
        this.elementCheck = new Array(tokensInArraysize);
        this.elementCheck.fill(false);
    }

    checkTypeOf(value) {
        if (value.startsWith("'") && value.endsWith("'")) return 'string';
        if (value === 'true' || value === 'false') return 'boolean';
        if (value === 'null') return 'object';
        return 'number';
    }

    createSyntaxTree(tokensInArray, depth) {
        const syntaxTree = { 'type' : 'array', 'child' : [] };
        for (let index = 0; index < tokensInArray.length; index++) {
            if (this.elementCheck[index] === true) continue;
            if (tokensInArray[index]['depth'] < depth) break;  
            else if (tokensInArray[index]['depth'] > depth) {
                syntaxTree['child'].push(this.createSyntaxTree(tokensInArray, depth+1));
            } else {
                this.elementCheck[index] = true;
                syntaxTree['child'].push( { 
                    'type'  : this.checkTypeOf(tokensInArray[index]['value']), 
                    'value' : tokensInArray[index]['value'], 
                    'child' : []
                } );
            } 
        }
        return syntaxTree;
    }
}

module.exports = Parser;