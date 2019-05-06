const ttc = require('./tokenTypeChecker');
const Node = require('./node');

const isValidToken = (value) => {
  return ttc.isNumber(value) ||
         ttc.isUndefined(value) ||
         ttc.isNull(value) ||
         ttc.isBoolean(value) ||
         ttc.isString(value) 
}
const lex = (token) => {
    if (ttc.isOpenBraket(token.type)) {
      return new Node("Array");
    } 
    if(ttc.isCloseBraket(token.type)) {
      return new Node("End")
    }
    if(isValidToken(token.type)) {
      if(ttc.isBoolean(token.type)) return new Node("Boolean", token.value)
      return new Node(token.type, token.value)
    }
    new TypeError(`" ${token.value} " 는 존재하지 않는 데이터 타입입니다.`)
  }

 module.exports = lex;