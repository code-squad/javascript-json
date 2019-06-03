module.exports = {
    stack: [],
    stackSize: 0,
    
    appendInStack: function(node) {
        this.stack.push(node);
        this.stackSize++;
    },

    appendInChild: function(dataNode) {
        const popNode = dataNode || this.popData();
        const lastNode = this.getLastData();
        lastNode.key ? lastNode.value.push(popNode) : lastNode.child.push(popNode);
    },

    popData: function() {
        this.stackSize--;
        return this.stack.pop();
    },

    countStack: function() {
        return this.stackSize;
    },
    
    getLastData: function() {
        const lastIdx = this.countStack()-1;
        return this.stack[lastIdx]
    }
}