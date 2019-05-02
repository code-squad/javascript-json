module.exports = {
  isDigit: char => char.search(/[0-9]/g) !== -1,
  isArrayStart: char => char === '[',
  isArrayEnd: char => char === ']',
  isComma: char => char === ',',
};