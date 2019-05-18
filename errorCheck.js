const util = require('./util');

const errorCheck = {
  trippleQuote(str) {
    if (util.countQuote(str) === 3) {
      throw new Error(`${str}는 올바른 문자열이 아닙니다`);
    }
    return false;
  },
};

module.exports = errorCheck;
