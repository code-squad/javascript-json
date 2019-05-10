const literals = require("./literals");
const separators = require("./separators");

module.exports = {
  isString(literalStr) {
    const literalStrLen = literalStr.length;
    if (literalStr[0] === "'" && literalStr[literalStrLen - 1] === "'")
      return true;
  },

  isCorrectStringForm(literalStr) {
    let cnt = 0;
    for (letter of literalStr) {
      cnt = letter === "'" ? cnt + 1 : cnt;
    }

    if (cnt === 2) return true;
    else throw `${literalStr}${errorMessages.INCORRECT_STRING}`;
  },

  isCorrectString(word) {
    return this.isString(word) && this.isCorrectStringForm(word);
  },

  isKey(next) {
    return next === separators.colon;
  },

  getLiteralsType(word, next) {
    if (Number.isFinite(Number(word))) {
      return literals.number;
    } else if (word === "false" || word === "true") {
      return literals.boolean;
    } else if (word === "null") {
      return literals.null;
    } else if (this.isCorrectString(word)) {
      return literals.string;
    } else if (this.isKey(next)) {
      return literals.key;
    } else {
      throw `${word}${errorMessages.UNKNOWN_TYPE}`;
    }
  },

  getLexedObj({ word, idx, arr, next }) {
    const lexedObj = {};
    next = arr[idx + 1];
    lexedObj.type = this.getLiteralsType(word, next);
    lexedObj.value = word;
    return { ...lexedObj };
  }
};
