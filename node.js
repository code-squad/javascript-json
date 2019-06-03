module.exports = {
    nodeProto: {
        key: undefined,
        type: undefined,
        value: undefined,
        child: undefined
    },

    getSeparatorNode(type) {
        let node = Object.assign({}, this.nodeProto);
        node.type = type;
        node.key ? node.value = [] : node.child = [];
        node = this.deleteGarbage(node);
        this.clearNodeProto();
        return node;
    },
    
    getDataNode(type, value) {
        let node = Object.assign({}, this.nodeProto);
        console.log(node);
        node.type = type;
        node.value = value;
        console.log(node);
        node = this.deleteGarbage(node);
        console.log(node);
        this.clearNodeProto();
        return node;
    },

    setKeyValue(value) {
        this.nodeProto.key = value;
    },

    deleteGarbage(node) {
        for(let key in node) {
            if(!node[key]) delete node[key];
        }
        return node;
    },

    clearNodeProto() {
        for(let key in this.nodeProto) {
            this.nodeProto[key] = undefined;
        }
    },
}