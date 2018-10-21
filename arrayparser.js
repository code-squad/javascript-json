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

const arrayParser = function(str) {
  const stack = new Stack();
  let parsedData;

  for (let token of str) {
    if (token.match(/\[/)) {
      stack.push(new Data("array", "ArrayObject"));
    } else if (token.match(/\]/)) {
      parsedData = stack.pop();
      if (stack.top) stack.top.data.child.push(parsedData);
    }
  }
  return parsedData;
};

/*
Test Case
*/
const str = "[[[[]]]]";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));
