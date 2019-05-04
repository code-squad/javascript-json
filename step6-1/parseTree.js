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

    insert(data, stack) {

        const node = new Node(data);

        if (this.root === null && node.type === parseUtils.dataType.startArray) {
            this.root = {type : node.type, child : []};
            stack.push(this.root);
        
        } else {
            let parent = stack.peek();
            
            if (node.type === parseUtils.dataType.startArray) {
                delete node.value;
                stack.push(node);
                parent.child.push(node);
            } else if (node.type === parseUtils.dataType.endArray) {
                if(stack.isEmpty()) throw new Error('올바른 데이터 형식이 아닙니다 (끝나는 괄호가 더 많습니다)');
                stack.pop();
            } else {
                parent.child.push(node);
            }

            this.root = parent;
        }
    }
}

module.exports = ParseTree;