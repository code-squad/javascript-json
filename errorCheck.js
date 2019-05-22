const util = require('./util');
const tc = require('./typeChecker');
const errorMsg = require('./errorMsg');

const errorCheck = {
  isNotTrippleQuote(str) {
    if (util.countQuote(str) === 3) {
      throw new Error(`${str} ${errorMsg.INCORRECT_STRING}`);
    }
    return true;
  },
  // Todo 에러처리 추가 예정
  // isValidArray(checkStack, token) {
  //   if (tc.isOpenBraket(token)) return [...checkStack, token];
  //   if (tc.isCloseBraket(token)) {
  //     if (tc.isOpenBraket(checkStack.pop())) return checkStack;
  //     throw new Error(`${errorMsg.INVALID_ARRAY}`);
  //   }
  //   return checkStack;
  // },
};

module.exports = errorCheck;
