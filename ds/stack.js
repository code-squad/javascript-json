class Stack {
  constructor(){
    this.container = [];
    this.cur = 0;
  }

  push(item){
    this.container[this.cur] = item;
    this.cur++;
  }

  pop(){
    if(!this.cur) {
      throw new Error('Stack underflow');
    }
    this.container.pop();
    this.cur--;
  }

  empty(){
    return this.cur === 0;
  }

  size(){
    return this.cur;
  }

  top(){
    if(this.cur){
      return this.container[this.cur - 1];
    } 
    // throw new Error('Stack is empty');
    console.error('Stack is emptyh now');
  }
}

module.exports = Stack;