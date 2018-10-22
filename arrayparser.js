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

  concat() {
    const parsedData = this.pop();
    if (this.top) this.top.data.child.push(parsedData);

    return parsedData;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const arrayParser = function (str) {
  const stack = new Stack();
  let numValue = "";
  let parsedData;

  for (let token of str) {
    if (token.match(/\[/)) {
      stack.push(new Data("array", "ArrayObject"));
    }
    else if (token.match(/,|\]/)) {
      if (numValue) {
        const topChild = stack.top.data.child;
        topChild.push(new Data("number", Number(numValue)));
        numValue = "";
      }

      if (token === ']') {
        parsedData = stack.concat();
      }
    }
    else if (token.match(/[0-9]|\./)) {
      numValue += token;
    }
  }
  return numValue ? new Data("number", Number(numValue)) : parsedData;
};

/*
Test Case
*/
const str = "123";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));