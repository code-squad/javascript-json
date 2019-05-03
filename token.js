class Token {
  constructor(type, value, child) {
    this._type = type;
    this._value = value;
    this._child = child;
  }
}

Token.prototype.tokenArr = []; // prototype data properties

module.exports = Token;
