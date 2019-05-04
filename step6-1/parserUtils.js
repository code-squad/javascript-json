const parserUtils = {
    dataType : {
        number : 'number',
        startArray : 'array',
        endArray : 'endArray',
        seperator : 'seperator',
        whitespace : 'whitespace'
    },

    getDataType(token) {

        typeRegexp = {
            number : /\d/g,
            startArray : /[\[]/g,
            endArray : /[\]]/g,
            seperator : /[,]+/g,
            whitespace : /\s+/g,
        };

        let dataType;

        Object.keys(typeRegexp).forEach((key) => {
            if (typeRegexp[key].test(token)) dataType = this.dataType[key];
        })

        return dataType;
    },
}

module.exports = parserUtils;