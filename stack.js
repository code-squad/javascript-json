class NodeStack {
    constructor() {
        this.stack = [];
    }
    isEmpty() {
        return this.stack.length === 0;
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    push(node) {
        this.stack.push(node);
    }

    pop() {
        return this.stack.pop();
    }

}
module.exports = NodeStack;