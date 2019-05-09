class Analyst {
    constructor() {
        this.typeList = [];
    }
    initList() {
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
        const counts = {
            array: 0,
            object: 0,
            number: 0,
            string: 0,
            boolean: 0,
            null: 0
        }
        for(let type of typeList) {
            counts[type] += 1;
        }
        return counts;
    }

    printCounts(counts) {
        const result = Object.entries(counts).map(([key, value]) => `${key} : ${value}개`).join(',\n');
        console.log(result);
    }

    run(parseTree) {
        this.initList();
        const typeList = this.getAllNodeTypes(parseTree);

    }
}
module.exports = Analyst;