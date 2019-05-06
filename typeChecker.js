const typeChecker = {
    isNumber (value) {
        /^-?[0-9\.]+$/g.test(value)
    },
    isNull (value) {
        return value === 'null';
    },
    isUndefined (value) {
        return value === 'undefined';
    },   
    isBoolean (value) {
        return value === 'true' || value === "false";
    }, 
    isValidString (value) {
        return /.+['"].+/.test(value)
    },
    isOpenBraket (value){
        return value === "["
    },
    isCloseBraket(value){
        return value === "]"
    },    
    isString (value) {
        return /^'.+'$/g.test(value) || /^".+"$/g.test(value)
    }
}
module.exports = typeChecker;
