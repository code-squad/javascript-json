const parseUtils = require('./parserUtils.js');

const Node = class {
    constructor(obj) {
        this.type = obj.type;
        this.value = obj.value;
        this.child = [];
    }
}

const ParseTree = class {
    constructor() {
        this.root = null;
    }
}