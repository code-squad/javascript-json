//가변길이 스택으로 클래스 구현
class Stack {
  constructor() {
    this.stack = [];
  }

  push(data) {
    this.stack.push(data);
  }

  pop() {
    if(this.stack.length <= 0) {
      return false;
    } else {
      return this.stack.pop();
    }
  }

  size() {
    return this.stack.length;
  }
}

module.exports = Stack;