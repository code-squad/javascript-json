class Node {
  constructor({ key, type, value, child }) {
    if (key) this.key = key;
    if (type) this.type = type;
    if (value) this.value = value;
    if (child) this.child = child;
  }
}
module.exports = Node;
