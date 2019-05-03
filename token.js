class Token {
  constructor(type, value, child) {
    this._type = type;
    this._value = value;
    this._child = child;
  }
}

module.exports = Token;
