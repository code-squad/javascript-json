const separators = require('./separators');
const errorChecker = require('./error');

class Lexer {
    lexing(tokenizedList) {
        const lexedList = [];
        tokenizedList.forEach( token => {
            if(this.isSeparator(token)) {
                lexedList.push(token);
                return
            }
            const type = this.getType(token);
            const lexedData =  this.convertValue(type, token);
            lexedList.push(lexedData);
        });
        errorChecker.typeValidator(lexedList);
        return lexedList;
    }

    isSeparator(token) {
        for(const key in separators) {
            if(separators[key] === token) return true;
        }
    }

    getType(token) {
        if(token === 'null') return 'null';
        if(token === 'true' || token === 'false') return 'boolean';
        if(!isNaN(token*1)) return 'number'
        return typeof token;
    }

    convertValue(type, token) {
        if(type === 'number') {
            return [type, Number(token)];
        }
        return [type, token];
    }
}

module.exports = Lexer;