const tc = require('./typeChecker');
const util = require('./util');
const ec = require('./errorCheck');

let tempStr = '';
let inQuote = false;

const makeToken = (tokens, char, index, arrOfChar) => {
  // 다음 문자라는 표현을 전달하기 위해 설명변수 사용
  const nextChar = arrOfChar[index + 1];

  if (tc.isQuote(char)) {
    // ec.validStr 함수는 quote가 열릴때만 실행됨
    // ec.validStr 가 ture가 아닌 경우 -> "asdf""
    inQuote = util.toggleBool(inQuote) && ec.validStr(tempStr);
  }

  if (inQuote) {
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

  if (tc.isBlank(char)) {
    return tokens;
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
