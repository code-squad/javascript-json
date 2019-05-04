class Node {
    constructor(type, value){
        this.type = type;
        if(value)this.value = value;
        this.child = [];
    }
}
module.exports = Node;