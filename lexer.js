class Lexer {
    constructor(validation) {
        this.validation = validation; 
        this.bracketStack = [];
    }

    getBracketDepth(strValue) {
        let currentBracketDepth = this.bracketStack.length;
        strValue.split('').forEach( element => {
            if (element === ']') this.bracketStack.pop();
            else if (element === '['){
                this.bracketStack.push('[');
                currentBracketDepth = this.bracketStack.length;
            }
        } );
        return currentBracketDepth;
    }

    getValueOfRemovedBracket(strValue) {
        let start = 0, end = strValue.length - 1;
        strValue.split('').forEach( element => {
            if (element === '[')        start++;
            else if (element === ']')   end--;
        } );
        const valueLength = end - start + 1;
        return strValue.substr(start, valueLength);
    }

    getTypeOf(value) { return this.validation.checkTypeOf(value); }

    analyze(strArray) {
        const tokenArray = [];
        strArray.forEach( strValue => {
            const depth = this.getBracketDepth(strValue);
            const value = this.getValueOfRemovedBracket(strValue);
            const type  = this.getTypeOf(value);
            tokenArray.push({ 'depth' : depth, 'value' : value, 'type' : type, });
        } );
        return tokenArray;
    }
}

module.exports = Lexer;