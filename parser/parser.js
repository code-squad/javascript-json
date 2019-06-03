const stack = require('./helper/stack');
const node = require('./helper/node');

class Parser {
    constructor(lexedList) {
        this.lexedList = lexedList;
        this.parsedList = [];
    }

    parsing() {
        if(!this.lexedList.length) return;
        let {type, value} = this.lexedList.shift();

        if(type === 'openArray' || type === 'openObject') {
            type = this.getOpenSeparatorType(type);
            const sepaNode = node.getSeparatorNode(type);
            stack.appendInStack(sepaNode);
        }
        else if(type === 'key') {
            node.setKeyValue(value);
        }
        else if(type === 'closeArray' || type === 'closeObject') {
            stack.countStack() > 1 ? stack.appendInChild() : this.parsedList.push(stack.popData());
        }
        else {
            if(type !== 'colon') {
                const dataNode = node.getDataNode(type, value);
                stack.appendInChild(dataNode);
            }
        }
        this.parsing();
        return this.parsedList;
    }

    getOpenSeparatorType(type) {
        if(type === 'openArray') return 'array';
        if(type === 'openObject') return 'object';
    }
}

module.exports = Parser