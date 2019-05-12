class Node {
    constructor({ key, type, value, child }) {
        this.key = key;
        this.type = type;
        this.value = value;
        this.child = child;
    }
}
module.exports = Node;