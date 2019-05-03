const typeChecker = {
    isQuote (value) {
        return value === "\'" || value === "\""
    },
    
    isBraket (value){
        return value === "[" || value === "]"
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
    
    
    // Returns if a value is null
    isNull (value) {
        return value === 'null';
    },
    
    // Returns if a value is undefined
    isUndefined (value) {
        return value === 'undefined';
    },
    
    // Returns if a value is a boolean
    isBoolean (value) {
        return value === 'true' || value === "false";
    },   
}
module.exports = typeChecker;
