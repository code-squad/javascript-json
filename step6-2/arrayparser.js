const Stack = require('./stack');

const ArrayParser = class {
    
    constructor(string) {
        this.string = string;
    }  

    get charType() {
        return {
            tokenArr : [',','[',']'],
            bracketArr : ['[', ']'],
            stringArr : ['\'','\"'],
        }
    }

    
}

module.exports = ArrayParser;
