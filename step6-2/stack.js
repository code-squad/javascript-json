const Stack = class {
    constructor() {
        this.stack = [];
    }

     push(item) {
        this.stack.push(item);
    }

     pop() {
        return this.stack.pop();
    }

     size() {
        return this.stack.length;
    }

     peek() {
        return this.stack[this.stack.length-1];
    }

     isEmpty() {
        return this.stack.length === 0;
    }
}

 module.exports = Stack; 