const tc = require('./typeChecker');
const util = require('./util');
const ec = require('./errorCheck');

let tempStr = '';
let isCharInQuote = false;

const makeToken = (tokens, char, index, arrOfChar) => {
  // 다음 문자라는 표현을 전달하기 위해 설명변수 사용
  const nextChar = arrOfChar[index + 1];

  if (tc.isQuote(char)) {
    // ec.trippleQuote 는 "가 시작될때(util.toggleBool(..) === true)만 발동함
    // " 가  시작됬을때 tempStr ""가 들어있다면 "asd"" 이므로 오류 발생
    isCharInQuote =
      util.toggleBool(isCharInQuote) && ec.isNotTrippleQuote(tempStr + char);
  }

  if (isCharInQuote) {
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
      .slice(1) // 첫번재 [ 를 지워야 parser 함수가 작동함 추후 개선할 요소
      .split('')
      .reduce(makeToken, [])
      // Todo  로직 추후 개선할 것
      // case -> ,공백{  공백이 tokens에 담기게 됨
      .filter(token => !tc.isEmpty(token))
  );
};

module.exports = tokenize;
