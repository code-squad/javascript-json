const TokenTypes = require('./tokenType');

const isArrayStart = char => char === '[';
const isArrayEnd = char => char === ']';
const isComma = char => char === ',';
const isDigit = char => char.search(/[0-9]/) !== -1;
const isSingleQuotation = char => char === '\'';
const isDoubleQuotation = char => char === '\"';
const isWhitespace = char => char.search(/\s/) !== -1;

const getTokenType = char => {
  if(isArrayStart(char)) return TokenTypes.ArrayStart;
  if(isArrayEnd(char)) return TokenTypes.ArrayEnd;
  if(isComma(char)) return TokenTypes.Comma;
  if(isDigit(char)) return TokenTypes.Digit;
  if(isSingleQuotation(char)) return TokenTypes.SingleQuotation;
  if(isDoubleQuotation(char)) return TokenTypes.DoubleQuotation;
  if(isWhitespace(char)) return TokenTypes.Whitespace;

  return TokenTypes.Character;
};

module.exports = getTokenType;