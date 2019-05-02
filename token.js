class Token {
  constructor(type, value, child, cnt) {
    this.type = type;
    this.value = value;
    this.child = [];
    this.cnt = cnt;
  }
}

module.exports = Token;
