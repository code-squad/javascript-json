const stack = require('./stack');
const node = require('./node');

class Parser {
    constructor(lexedList) {
        this.lexedList = lexedList;
    }

    parsing() {
        if(!this.lexedList.length) return;
        let {type, value} = this.lexedList.shift();

        if(type === 'openArray' || type === 'openObject') {
            type = this.getOpenSeparatorType(type);
            const newNode = node.getSeparatorNode(type);
        }
    }

    getOpenSeparatorType(type) {
        if(type === 'openArray') return 'array';
        if(type === 'openObject') return 'object';
    }
}

module.exports = Parser