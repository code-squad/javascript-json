const tc = require('./typeChecker');

const util = {
  toggleBool(value) {
    return value ? false : true;
  },
  countQuote(str) {
    return str.split('').filter(v => tc.isQuote(v)).length;
  },
};

module.exports = util;
