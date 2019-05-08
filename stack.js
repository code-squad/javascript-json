module.exports = {
    stack : [],
    openArr : '[',
    closeArr : ']',
    stackSize : 0,

    appendInStack: function(data) {
        this.stackSize++;
        this.stack.push(data);      
    },

    pop: function() {
        this.stackSize--;
        return this.stack.pop();
    },

    appendInChild: function(data) {
        this.stack[this.stackSize-1].child.push(data)
    },

    countStack: function() {
        return this.stackSize;
    }
}