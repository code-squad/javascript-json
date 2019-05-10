const validation = {
    isNull      : function (value) { return value === 'null'; },

    isArray     : function (value) { return Array.isArray(value); },

    isNumber    : function (value) { return !isNaN(Number(value)); },

    isBoolean   : function (value) { return value === 'true' || value === 'false'; },

    isString    : function (value) { 
        if (!value.startsWith("'") || !value.endsWith("'"))         return false;
        if (value.substr(1, value.length-2).indexOf("'") !== -1)    return false;
        return true;
    },

    checkTypeOf : function (value) {
        if (this.isNull(value))     return 'null';
        if (this.isArray(value))    return 'array';
        if (this.isNumber(value))   return 'number';
        if (this.isBoolean(value))  return 'boolean';
        if (this.isString(value))   return 'string';
        throw Error('Type Error!!');
    },
}

module.exports = validation;
