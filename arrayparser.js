// 데이터 타입에 따라 생성되는 class
class Data {
  constructor(type, value) {
    this.type = type;
    this.value = value;
    this.child = [];
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    const node = new Node(data);

    node.next = this.top;
    this.top = node;
  }

  pop() {
    if (!this.top) return;

    const data = this.top.data;
    this.top = this.top.next;

    return data;
  }

  peek() {
    return this.top.data;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/*
Test Case
*/
const str = "[123,33]";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));
