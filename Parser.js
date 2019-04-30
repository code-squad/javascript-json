const separators = require("./separators");
const literals = require("./literals");
const errorMessages = require("./errorMessages");

const { log } = console;

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
  },

  getLiteralsType(word) {
    if (Number.isFinite(Number(word))) {
      return literals.number;
    } else if (word === "false" || word === "true") {
      return literals.boolean;
    } else if (word === "null") {
      return literals.null;
    } else {
      return literals.string;
    }
  }
};

class Parser {
  constructor() {
    this.tokenizedData = [];
    this.lexedData = [];
  }

  tokenizing() {
    //unparsedData를 모두 분해한 뒤, 토큰화(의미 있는 묶음으로 만듦)한다.
    //결과를 tokenizedData에 저장
    if (this.unparsedData === undefined) {
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
    if(this.tokenizedData === undefined) {
      log(errorMessages.NO_TOKENIZED_DATA);
      return;
    }
    const lexedObj = {};
    this.lexedData = this.tokenizedData.map(word => {
      if (!parserUtils.isSeparator(word)) {
        lexedObj.type = parserUtils.getLiteralsType(word);
        lexedObj.value = word;
        lexedObj.child = []; //array인 경우 추가
        return { ...lexedObj };
      } else {
        return word;
      }
    });
    log(this.lexedData);
  }

  parsing() {
    log("parser executed");
  }

  array(unparsedArray) {
    this.unparsedData = unparsedArray;
    this.tokenizing();
    this.lexing();
    // this.parsing();
  }
}

module.exports = Parser;
