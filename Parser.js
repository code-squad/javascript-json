//utils
const separators = require("./utils/separators");
const literals = require("./utils/literals");
const tokenizerUtils = require("./utils/tokenizerUtils");
const lexerUtils = require("./utils/lexerUtils");
const parserUtils = require("./utils/parserUtils");
const isSeparator = require("./utils/isSeparator");

const errorMessages = require("./utils/errorMessages");
const Stack = require("./data_structure/Stack");
const parentObjStack = new Stack();

const { log } = console;

class Parser {
  constructor() {
    this.currKey = null;
  }
  tokenizing(unparsedJson) {
    //unparsedData를 모두 분해한 뒤, 토큰화(의미 있는 묶음으로 만듦)한다.
    if (unparsedJson === undefined) {
      log(errorMessages.NO_PARSING_DATA);
      return;
    }
    const decomposedDataArr = unparsedJson.split("");
    return tokenizerUtils.makeTokenizedData(decomposedDataArr);
  }

  lexing(tokenizedJson) {
    //tokenizedData의 요소들을 검사하여 의미를 부여한다.
    if (tokenizedJson === undefined) {
      log(errorMessages.NO_TOKENIZED_DATA);
      return;
    }
    const lexedJson = tokenizedJson.map((word, idx, arr) => {
      return lexerUtils.getLexedObj({
        word,
        idx,
        arr,
        next: null
      });
    });

    return lexedJson;
  }

  parsing(lexedJson, parsingDataObj) {
    //구분자를 확인해서 JSON 객체 데이터 생성
    let word = lexedJson[0];
    if (word === undefined) return;
    lexedJson.shift();

    if (word === separators.endOfArray) {
      const parentObj = parentObjStack.pop();
      parsingDataObj = parentObj;
    } else if (word === separators.endOfObject) {
      const parentObj = parentObjStack.pop();
      parsingDataObj = parentObj;
    } else if (word === separators.startOfArray) {
      const childObj = parserUtils.ChildObj("array");

      parserUtils.addChildObj({
        currKey: this.currKey,
        childObj,
        parsingDataObj
      });
      this.currKey = null;
      parentObjStack.push(parsingDataObj);
      parsingDataObj = childObj;
    } else if (word === separators.startOfObject) {
      const childObj = parserUtils.ChildObj("object");

      parsingDataObj.child.push(childObj);
      parentObjStack.push(parsingDataObj);
      parsingDataObj = childObj;
    } else if (word.type === literals.key) {
      this.currKey = word.value;
    } else if (typeof word === "object") {
      parserUtils.addChildObj({
        currKey: this.currKey,
        childObj: word,
        parsingDataObj
      });
      this.currKey = null;
    }
    this.parsing(lexedJson, parsingDataObj);
  }

  getJson(unparsedJson) {
    const tokenizedJson = this.tokenizing(unparsedJson);
    const lexedJson = this.lexing(tokenizedJson);
    const resultObj = {
      child: []
    };
    this.parsing(lexedJson, resultObj);
    const resultText = JSON.stringify(resultObj.child[0], null, 2);
    return resultText;
  }
}

module.exports = Parser;
