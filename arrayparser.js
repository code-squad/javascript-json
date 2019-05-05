const Token = require("./token.js");

class ArrayParser {
  constructor() {
    this.tokenArr = [];
    this.tokenStack = [];
    this.parsingData = [];
  }

  push(parentToken) {
    this.tokenStack.push(parentToken);
  }

  pop() {
    return this.tokenStack[this.tokenStack - 1];
  }

  tokenizer(inputStr) {
    inputStr = inputStr.replace(/\[/g, "[,");
    inputStr = inputStr.replace(/\]/g, ",]");
    inputStr = inputStr.replace(/\s/g, "");
    return inputStr.split(",");
  }

  lexer(tokenizeredData) {
    tokenizeredData.forEach(element => {
      if (element[0] === "[") {
        this.tokenArr.push(new Token("array"));
      } else if (element[0] === "]") {
        this.tokenArr.push(new Token("array-end"));
      } else {
        this.tokenArr.push(new Token("number", element));
      }
    });

    return this.tokenArr;
  }

  parse() {
    //tokenArr들을 순회하면서 돌다가 token_type이 array이면 parentToken으로 저장하고 cnt를 1 만큼 증가
    //token_type이 end이면 cnt를 1만큼 감소
    //순회 과정은 cnt가 0이 될 때까지 반복
    //그 사이에 있던 애들은 parentToken의 child에 push
    let currentParentToken;
    let currentChildToken;
    this.tokenArr.forEach(token => {
      // console.log(token);
      if (token._type === "array") {
        this.tokenStack.push(token);
      } else if (token._type === "number") {
        currentParentToken = this.tokenStack.pop();
        currentParentToken._child.push(token);
        this.tokenStack.push(currentParentToken);
      } else if (token._type === "array-end") {
        currentChildToken = this.tokenStack.pop();
        // console.log(currentChildToken);
        // this.tokenStack의 길이가 0보다 큰 경우만 아래 실행
        if (this.tokenStack.length > 0) {
          currentParentToken = this.tokenStack.pop();
          // console.log(currentParentToken);
          currentParentToken._child.push(currentChildToken);
          this.tokenStack.push(currentParentToken);
        }

        // currentParentToken._child.push();
        // this.tokenStack.push(currentParentToken);
        //pop하고..
        //pop한 데이터를 다시 한번 pop한 부모의 child에 push
      }
    });
    return currentParentToken;
  }

  startParsing(inputStr) {
    // 1. tokenizer
    const tokenizeredData = this.tokenizer(inputStr);
    // console.log(tokenizeredData);

    // 2. lexer
    const lexeredData = this.lexer(tokenizeredData);
    // console.log(lexeredData);

    // 3. parse

    const result = this.parse();
    return result;
    console.log(result);
  }
}

const targetStr = "[123, 22, 33]";
// const targetStr = "[123, 22, [33]]";

const arrayParser = new ArrayParser();
const result = arrayParser.startParsing(targetStr);
console.log(result);
console.log("=======");
console.log(JSON.stringify(result));
