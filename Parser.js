const {log} = console;

class Parser {
  constructor() {
    this.tokenizedData = [];
    this.lexedData = [];
  }

  tokenizing() {
    //unparsedData를 모두 분해한 뒤, 토큰화(의미 있는 묶음으로 만듦)한다.
    //결과를 tokenizedData에 저장
    log("tokenizer executed");
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
    log(this.tokenizedData);
    log(this.lexedData);
    this.tokenizing();
    this.lexing();
    this.parsing();
  }
}

module.exports = Parser;