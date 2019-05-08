const Node = require("./node")

const defaultParentNode = new Node("Array")
const parse = (lexedQueue, parentNode = defaultParentNode) => {
    const node = lexedQueue.shift();
    if(node === undefined || node.type === "End") {
        return parentNode;
    }
    if(node.type === "Array"){
        const childeNode = node;
        parentNode.child.push(parse(lexedQueue, childeNode));
        return parse(lexedQueue, parentNode)
    }
    parentNode.child.push(node);
    return parse(lexedQueue, parentNode)
}

module.exports = parse;