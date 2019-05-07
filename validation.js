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

console.log(`isArray : `, validation.isArray([1, 2, 3]));
console.log(`isArray : `, validation.isArray([ {key : 'a', value : 0}, {key : 'b', value : 1}, {key : 'c', value : 2}]));
console.log(`isArray : `, validation.isArray(['1', '2', '3']));
console.log(`isArray : `, validation.isArray('123'));
console.log(`isArray : `, validation.isArray('null'));
console.log(`isArray : `, validation.isArray("'string'"));

console.log(`isNull : `, validation.isNull('null'));
console.log(`isNull : `, validation.isNull([1,2,3]));
console.log(`isNull : `, validation.isNull([ {key : 'a', value : 0}, {key : 'b', value : 1}, {key : 'c', value : 2}]));
console.log(`isNull : `, validation.isNull('123'));
console.log(`isNull : `, validation.isNull('true'));

console.log(`isNumber : `, validation.isNumber('123'));
console.log(`isNumber : `, validation.isNumber('1d3'));
console.log(`isNumber : `, validation.isNumber('d123'));
console.log(`isNumber : `, validation.isNumber('123d'));
console.log(`isNumber : `, validation.isNumber('d123d'));

console.log(`isBoolean : `, validation.isBoolean([ {key : 'a', value : 0}, {key : 'b', value : 1}, {key : 'c', value : 2}]));
console.log(`isBoolean : `, validation.isBoolean('true'));
console.log(`isBoolean : `, validation.isBoolean('false'));
console.log(`isBoolean : `, validation.isBoolean('123'));
console.log(`isBoolean : `, validation.isBoolean('123d'));
console.log(`isBoolean : `, validation.isBoolean('ddd123'));

console.log(`isString : `, validation.isString("'abc'"));
console.log(`isString : `, validation.isString("'abc"));
console.log(`isString : `, validation.isString("abc'"));
console.log(`isString : `, validation.isString("''abc''"));
console.log(`isString : `, validation.isString("'ab'c'"));
console.log(`isString : `, validation.isString("'''ab'c'"));
console.log(`isString : `, validation.isString("ab'''c'"));