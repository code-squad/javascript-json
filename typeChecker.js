const typeChecker = {
  isNumber(value) {
    return /^-?[0-9.]+$/.test(value);
  },
  isNull(value) {
    return value === 'null';
  },
  isUndefined(value) {
    return value === 'undefined';
  },
  isBoolean(value) {
    return value === 'true' || value === 'false';
  },
  isValidString(value) {
    if (/.+['"].+/.test(value)) {
      throw new TypeError(`${value}는 올바른 문자열이 아닙니다.`);
    }
  },
  isOpenBraket(value) {
    return value === '[';
  },
  isCloseBraket(value) {
    return value === ']';
  },
  isOpenBrace(value) {
    return value === '{';
  },
  isCloseBrace(value) {
    return value === '}';
  },
  isComma(value) {
    return value === ',';
  },
  isColon(value) {
    return value === ':';
  },
  isString(value) {
    return /^'.+'$/g.test(value) || /^".+"$/g.test(value);
  },
  isSperator(value) {
    return /\[|\]|,|:|\{|\}/.test(value);
  },
  isQuote(value) {
    return /'|"/.test(value);
  },

  isBlank(value) {
    return value === ' ';
  },
  isEmpty(value) {
    return value === '';
  },
};
module.exports = typeChecker;
