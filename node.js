class Node {
  constructor({ key, type, value }) {
    if (key) this.key = key;
    if (type) this.type = type;
    if (value) this.value = value;
    this.child = [];
  }
}
module.exports = Node;
