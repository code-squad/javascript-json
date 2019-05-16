class Token {
  constructor({ type, value: element, key: objKey }) {
    this._type = type;
    this._key = objKey;
    this._value = element;
    this._child = [];
  }
}

module.exports = Token;
