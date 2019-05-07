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

// const validation = require('./validation');
// const lexer = new Lexer(validation);
// console.log(lexer.getBracketDepth('[[98]]'));  // 2
// console.log(lexer.getValueOfRemovedBracket('[[[null]]]]')); // null
// console.log(lexer.getTypeOf('123'));
// console.log(lexer.getTypeOf([1,2,3]));
// console.log(lexer.getTypeOf("'aa'"));
// console.log(lexer.analyze(["[12", "'1a3'", "'2abs3'"]));