const tc = require('./typeChecker');
const util = require('./util');
const ec = require('./errorCheck');

let tempStr = '';
let isInQuote = false;

const makeToken = (tokens, char, index, arrOfChar) => {
  // 다음 문자라는 표현을 전달하기 위해 설명변수 사용
  const nextChar = arrOfChar[index + 1];

  if (tc.isQuote(char) && !ec.trippleQuote(tempStr + char)) {
    isInQuote = util.toggleBool(isInQuote);
  }

  if (isInQuote) {
    tempStr += char;
    return tokens;
  }

  if (tc.isSperator(char)) {
    tempStr = '';
    return [...tokens, char];
  }

  if (tc.isSperator(nextChar)) {
    tempStr += char;
    return [...tokens, tempStr.trim()];
  }

  tempStr += char;
  return tokens;
};

const tokenize = str => {
  return (
    str
      .split('')
      .reduce(makeToken, [])
      // Todo  로직 추후 개선할 것
      // case -> ,공백{  공백이 tokens에 담기게 됨
      .filter(token => !tc.isEmpty(token))
  );
};

module.exports = tokenize;
