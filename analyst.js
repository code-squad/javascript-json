class Analyst {
    constructor() {
        this.typeList = [];
    }

    getAllNodeTypes(parseTree) {
        for (let childNode of parseTree.child) {
            this.typeList.push(childNode.type);
            if (childNode.child) this.getAllNodeTypes(childNode);
        }
        return this.typeList;
    }

    countTypes(typeList) {

    }

    run(parseTree) {

    }
}
module.exports = Analyst;