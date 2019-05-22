const tc = require('./typeChecker');

const util = {
  toggleBool(value) {
    return value ? false : true;
  },
  countQuote(str) {
    return str.split('').filter(v => tc.isQuote(v)).length;
  },
  deletFirstLastChar(str) {
    return str.slice(1).slice(0, -1);
  },
};

module.exports = util;
