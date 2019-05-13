const Stack = require('./stack');

const utils = {
    
    typesRegexp : {
        startArray : /[\[]/,
        endArray : /[\]]/,
        number : /^[-|+]?\d*[.]?\d+/,
        string : /"([^\\"]|\\")*"|'([^\\']|\\')*'/,
        boolean : /true|false/,
        null : /null/,
    },

}

module.exports = utils;