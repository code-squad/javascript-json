module.exports = {
    stack: [],
    stackSize: 0,
    
    appendInStack: function(arrayFormat) {
        this.stack.push(arrayFormat);
        this.stackSize++;
    },

    appendInChild: function(dataFormat) {
        const lastIdx = this.stackSize-1;
        let arrayIs;
        this.getLastStackType()[key] ? arrayIs = 'key' : arrayIs = 'child';
        this.stack[lastIdx][arrayIs].push(dataFormat);
    },

    popData: function() {
        this.stackSize--;
        return this.stack.pop();
    },

    countStack: function() {
        return this.stackSize;
    },

    getLastStackType: function() {
        const lastIdx = this.stackSize-1;
        return this.stack[lastIdx].type;
    }
}