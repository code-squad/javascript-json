const util = require('./util');

const errorCheck = {
  validStr(str) {
    if (util.isEmpty(str)) return true;
    throw new Error(`${str + '"'} 은 올바른 문자열이 아닙니다 `);
  },
};

module.exports = errorCheck;
