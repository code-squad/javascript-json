class Token {
  constructor({ type, value: element }) {
    this._type = type;
    this._value = element;
    this._child = [];
  }
}

module.exports = Token;
