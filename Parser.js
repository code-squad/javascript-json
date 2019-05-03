const separators = require("./separators");
const literals = require("./literals");
const errorMessages = require("./errorMessages");
const Stack = require("./Stack");
const parentObjStack = new Stack();

const { log } = console;

const parserUtils = {
  tokenizedWord : "",
  isSeparator(letter) {
    for (let separator of Object.values(separators)) {
      if (letter === separator) return true;
    }
    return false;
  },

  isEndofLiteral(idx, decomposedDataArr) {
    return (
      decomposedDataArr[idx + 1] === separators.rest ||
      decomposedDataArr[idx + 1] === separators.endOfArray
    );
  },

  getTokenizedWord(letter, idx, decomposedDataArr) {
    if (this.isSeparator(letter)) {
      this.tokenizedWord = "";
      return letter;
    } else {
      this.tokenizedWord += letter;
      if (this.isEndofLiteral(idx, decomposedDataArr)) {
        return this.tokenizedWord.trim();
      }
    }
  },

  joinLiterals(decomposedDataArr) {
    return decomposedDataArr.map((letter, idx, arr) =>
      this.getTokenizedWord(letter, idx, arr)
    );
  },

  makeTokenizedData(decomposedDataArr) {
    const literalsJoinedArr = this.joinLiterals(decomposedDataArr);
    return literalsJoinedArr.filter(letter => letter !== undefined);
  },

  isString(literalStr) {
    const literalStrLen = literalStr.length;
    if (literalStr[0] === "'" && literalStr[literalStrLen - 1] === "'")
      return true;
  },

  isCorrectStringForm(literalStr) {
    const literalStrArr = [...literalStr];
    let cnt = 0;
    cnt = literalStrArr.reduce(
      (acc, currStr) => (acc += (currStr === "'") ? 1 : 0),
      cnt
    );

    if (cnt === 2) return true;
    else throw `${literalStr}${errorMessages.INCORRECT_STRING}`;
  },

  isCorrectString(word) {
    return this.isString(word) && this.isCorrectStringForm(word)
  },

  getLiteralsType(word) {
    if (Number.isFinite(Number(word))) {
      return literals.number;
    } else if (word === "false" || word === "true") {
      return literals.boolean;
    } else if (word === "null") {
      return literals.null;
    } else if (this.isCorrectString(word)) {
      return literals.string;
    } else {
      throw `${word}${errorMessages.UNKNOWN_TYPE}`;
    }
  }
};

class Parser {
  tokenizing(unparsedData) {
    //unparsedData를 모두 분해한 뒤, 토큰화(의미 있는 묶음으로 만듦)한다.
    if (unparsedData === undefined) {
      log(errorMessages.NO_PARSING_DATA);
      return;
    }
    const decomposedDataArr = unparsedData.split("");
    return parserUtils.makeTokenizedData(decomposedDataArr);
  }

  lexing(tokenizedArray) {
    //tokenizedData의 요소들을 검사하여 의미를 부여한다.
    if (tokenizedArray === undefined) {
      log(errorMessages.NO_TOKENIZED_DATA);
      return;
    }
    const lexedObj = {};
    return tokenizedArray.map(word => {
      if (!parserUtils.isSeparator(word)) {
        lexedObj.type = parserUtils.getLiteralsType(word);
        lexedObj.value = word;
        lexedObj.child = []; //array인 경우 추가
        return { ...lexedObj };
      } else {
        return word;
      }
    });
  }

  parsing(lexedArray, parsingDataObj) {
    //구분자를 확인해서 JSON 객체 데이터 생성
    let word = lexedArray[0];
    if (word === undefined) return;

    lexedArray.shift();
    if (word === separators.endOfArray) {
      const parentObj = parentObjStack.pop();
      this.parsing(lexedArray, parentObj);
    } else if (word === separators.startOfArray) {
      const childObj = {
        type: "array",
        child: []
      };
      parsingDataObj.child.push(childObj);
      parentObjStack.push(parsingDataObj);
      this.parsing(lexedArray, childObj);
    } else if (typeof word === "object") {
      parsingDataObj.child.push(word);
      this.parsing(lexedArray, parsingDataObj);
    } else {
      this.parsing(lexedArray, parsingDataObj);
    }
  }

  array(unparsedArray) {
    const tokenizedArray = this.tokenizing(unparsedArray);
    const lexedArray = this.lexing(tokenizedArray);
    const resultObj = {
      child: []
    };
    this.parsing(lexedArray, resultObj);
    const resultText = JSON.stringify(resultObj.child[0], null, 2);
    log(resultText);
  }
}

module.exports = Parser;
