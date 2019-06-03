module.exports = {
    stack: [],
    stackSize: 0,
    lastType: undefined,
    
    appendInStack: function(arrayFormat) {
        this.stack.push(arrayFormat);
        this.stackSize++;
    },

    appendInPreviousData: function(popData) {
        const lastInStack = this.getLastData();
        let arrayName;
        lastInStack['value'] ? arrayName = 'value' : arrayName = 'child';
        const arrayInLastStack = lastInStack[arrayName];
        arrayInLastStack.push(popData);
    },

    popData: function() {
        this.stackSize--;
        return this.stack.pop();
    },

    countStack: function() {
        return this.stackSize;
    },

    setLastDataType: function() {
        const lastInStack = this.getLastData();
        this.lastDataType = lastInStack.type;
    },

    getLastType: function() {
        return this.lastDataType;
    },
    
    getLastData: function() {
        const lastIdx = this.stackSize-1;
        return this.stack[lastIdx]
    }
}