const typeChecker = {
    isQuote (value) {
        return value === "\'" || value === "\""
    },
    isBraket  (value) {
        return value === "[" || value === "]"
    },
    isOpenBraket (value){
        return value === "["
    },
    isCloseBraket(value){
        return value === "]"
    },
    isComma (value){
        return value === ","
    },
    
    isWhiteSpace (value){
        return /\s/.test(value);
    },
    
    // Returns if a value is really a number
    isNumber (value) {
        return /[0-9]/.test(value);
    },
    // Returns if a value is a string
    isString (value) {
        return /[a-z]/i.test(value)
    },
    
    isSkipChar(value){
        return this.isComma(value) || this.isWhiteSpace(value)
    },
    isNumOrStr(value){
        return this.isNum(value) || this.isString(value)
    }
}
module.exports = typeChecker;
