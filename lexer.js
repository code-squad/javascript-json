const separators = require('./separators');
const errorChecker = require('./error');

class Lexer {
    lexing(tokenizedList) {
        const lexedList = [];
        tokenizedList.forEach( token => {
            let lexedData;
            const separatorKey = this.getSeparatorName(token);
            if(separatorKey) {
                lexedData = this.convertValue(separatorKey, token);
                lexedList.push(lexedData);
            }
            else {
                const type = this.getType(token);
                lexedData =  this.convertValue(type, token);
                lexedList.push(lexedData);
            }
        });
        errorChecker.typeValidator(lexedList);
        return lexedList;
    }

    getSeparatorName(token) {
        for(let key in separators) {
            if(separators[key] === token) return key;
        }
    }

    getType(token) {
        if(token === 'null') return 'null';
        if(token === 'true' || token === 'false') return 'boolean';
        if(!isNaN(token*1)) return 'number'
        return typeof token;
    }

    convertValue(type, token) {
        const format = {
            type: type,
            value: token
        }
        if(type === 'number') {
            format.value = Number(token);
        }
        return format
    }
}



module.exports = Lexer;