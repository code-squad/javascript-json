class Token {
  constructor(type, value) {
    this._type = type;
    this._value = value;
    this._child = [];
  }
}

module.exports = Token;
