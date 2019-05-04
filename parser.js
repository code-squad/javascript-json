 const parse = (parentNode, lexedQueue) => {
    const node = lexedQueue.shift();
    if(node.type === "End") {
        return parentNode;
    }
    if(node.type === "Array"){
        let childeNode = node;
        parentNode.child.push(parse(childeNode, lexedQueue));
        return parse(parentNode, lexedQueue)
    }
    parentNode.child.push(node);
    return parse(parentNode, lexedQueue)
}

module.exports = parse;