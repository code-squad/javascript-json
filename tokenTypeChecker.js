const tokenTypeChecker = {
    isOpenBraket(value){
        return value === "openBraket";
    },
    isCloseBraket(value){
        return value === "closeBraket";
    },
    // Returns if a value is really a number
    isNumber (value) {
        return value === "number";
    },
    // Returns if a value is a string
    isString (value) {
        return value === "string"
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
    } 
}
module.exports = tokenTypeChecker;
