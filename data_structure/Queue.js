class Queue {
  constructor() {
    this.queue = [];
  }

  push(data) {
    this.queue.push(data);
  }

  peek() {
    if(this.queue.length <= 0) throw new Error("No data in this queue!");
    return this.queue.shift();
  }

  print() {
    this.queue.forEach((element) => {
      console.log(element);
    });
  }
}

module.exports = Queue;