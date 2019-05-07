const tc = require('./typeChecker');
const Node = require('./node');
const util = require('./util');

const lex = (token) => {
    if(tc.isNumber(token)) {
      return new Node("number", token)
    }
    if(tc.isNull(token)) {
      return new Node("null", token)
    }
    if(tc.isString(token)) {
      const tokenWithoutQuote = util.deleteFirstLastChar(token);
      return new Node("string", tokenWithoutQuote)
    }
    if(tc.isUndefined(token)) {
      return new Node("undefined", token)
    }
    if (tc.isOpenBraket(token)) {
      return new Node("Array");
    }
    if(tc.isCloseBraket(token)) {
      return new Node("End")
    }
    if(tc.isBoolean(token)) {
      return new Node("boolean", token)
    }

    throw new TypeError(`${token} 는 존재하지 않는 데이터 타입입니다.`)
  }

 module.exports = lex;