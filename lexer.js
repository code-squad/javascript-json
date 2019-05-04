class Lexer {
    constructor() { 
        this.emptySpaceRegex = /\s/gi;
        this.bracketStack = [];
    }

    checkBracketDepth(str) {
        let currentBracketDepth = this.bracketStack.length;
        str.split('').forEach( element => {
            if (element === ']') this.bracketStack.pop();
            else if (element === '[') {
                this.bracketStack.push('[');
                currentBracketDepth = this.bracketStack.length;
            }
        } );
        return currentBracketDepth - 1;
    }

    removeBracketFromStringValue(str) {
        let frontIndex = 0, rearIndex = str.length - 1;
        str.split('').forEach( element => {
            if (element === '[')        frontIndex++
            else if (element === ']')   rearIndex--;
        } );
        const elementLength = rearIndex - frontIndex + 1;
        return str.substr(frontIndex, elementLength);
    }

    extractTokensInformation(strInArray) {
        const tokensInArray = [];
        strInArray.forEach( str => {
            const depth = this.checkBracketDepth(str);
            const value = this.removeBracketFromStringValue(str);
            tokensInArray.push( { 'depth' : depth , 'value' : value } ); 
        });
        return tokensInArray;
    }

    splitStringValue(str) { return str.replace(this.emptySpaceRegex, "").split(','); }

    getTokensInArray(str) {
        if (!str.startsWith('[') || !str.endsWith(']')) throw Error('Syntax Error!');
        return this.extractTokensInformation(this.splitStringValue(str));
    }
}

module.exports = Lexer;