const Stack = require('./stack')

const Node = class {
    constructor({type, value, child}) {
        this.type = type;
        this.value = value;
        this.child = child;
    }
}

const ParseTree = class {
    constructor({root = null, stack}) {
        this.root = root;
        this.stack = stack;
    }

    insert(data) {
        const node = new Node(data);

        if (this.root === null) {
           this.root = node;
           this.stack.push(this.root);

        } else {
           this.root = this.stack.peek();

            if (node.type === 'array') {
               this.stack.push(node);
               this.root.child.push(node);
            } else if (node.type === 'endArray') {
                if(this.stack.isEmpty()) {
                   throw new Error('올바른 데이터 형식이 아닙니다 (끝나는 괄호가 더 많습니다)');
               }
               this.stack.pop();
            } else {
               this.root.child.push(node);
           }
       }
   }
}

module.exports = ParseTree; 
