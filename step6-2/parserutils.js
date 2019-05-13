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

    getDataType(token) {
        let type = undefined;

        switch (true) {
            case this.typesRegexp.number.test(token):
                if (token.match(this.typesRegexp.number)[0] === token) {
                    type = 'number';
                }
                break;
            case this.typesRegexp.string.test(token):
                type = 'string';
                break;
            case this.typesRegexp.startArray.test(token):
                type = 'array';
                break;
            case this.typesRegexp.endArray.test(token):
                type = 'endArray';
                break;
            case this.typesRegexp.boolean.test(token):
                type = 'boolean';
                break;
            case this.typesRegexp.null.test(token):
                type = 'null';
                break;
            default:
                break;
        }

        if (type === undefined) {
            throw new Error(`[[  ${token}  ]]은 알 수 없는 타입입니다`);
        }
        return type;
    }

}

module.exports = utils;