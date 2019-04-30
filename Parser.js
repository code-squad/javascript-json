const separators = require('./separators');
const errorMessages = require('./errorMessages');

const {log} = console;

const parserUtils = {
  isSeparator: function(letter) {
    for (let separator of Object.values(separators)) {
      if (letter === separator) return true;
    }
    return false;
  },

  joinLiterals: function(decomposedDataArr) {
    let data = "";
    const literalsJoinedArr = decomposedDataArr
      .map((letter, idx) => {
        if (this.isSeparator(letter)) {
          data = "";
          return letter;
        } else {
          data += letter;
          if (
            idx < decomposedDataArr.length - 1 &&
            (decomposedDataArr[idx + 1] === separators.rest ||
              decomposedDataArr[idx + 1] === separators.endOfArray)
          ) {
            return data.trim();
          }
        }
      })
      .filter(letter => letter !== undefined);
    return literalsJoinedArr;
  }
}

class Parser {
  constructor() {
    this.tokenizedData = [];
    this.lexedData = [];
  }

  tokenizing() {
    //unparsedData를 모두 분해한 뒤, 토큰화(의미 있는 묶음으로 만듦)한다.
    //결과를 tokenizedData에 저장
    if(this.unparsedData === undefined) {
      log(errorMessages.NO_PARSING_DATA);
      return;
    }
    const decomposedDataArr = this.unparsedData.split("");
    this.tokenizedData = parserUtils.joinLiterals(decomposedDataArr);
    log(this.tokenizedData);
  }

  lexing() {
    //tokenizedData의 요소들을 검사하여 의미를 부여한다.
    //결과를 lexedData에 저장
    log("lexer executed");
  }

  parsing() {
    log("parser executed");
  }

  array(unparsedArray) {
    this.unparsedData = unparsedArray;
    this.tokenizing();
    // this.lexing();
    // this.parsing();
  }
}

module.exports = Parser;