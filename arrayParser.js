const Lexer = require('./lexer');
const TokenType = require('./tokenUtil/tokenType');
const WordType = require('./wordUtil/wordType');

class ArrayParser {
  constructor(lexer){
    this.lexer = lexer;
    this.skipToken = [ TokenType.Whitespace, TokenType.Comma ];
  }

  /*
  * 중첩된 배열을 처리하는 함수
  * 입력: 없음
  * 출력: 분석한 결과를 배열로 반환
  */
  analysisRecursively(){
    const partialResult = [];
    let encounterArrayEnd = false;

    // 종료조건: 1. lexer가 할 일을 마치거나 2. ']' 토큰을 만났을 때
    while(!this.lexer.isFinish()){
      const word = this.lexer.getWord();

      if(this.skipToken.some(type => type === word.type)){
        continue;
      }

      if(word.type === TokenType.ArrayEnd){
        encounterArrayEnd = true;
        break;
      }

      if(word.type === TokenType.ArrayStart){
        const newArrayWord = { type: 'Array' };
        newArrayWord.children = this.analysisRecursively();
        partialResult.push(newArrayWord);
      } else {
        partialResult.push(word);
      }
    }
    
    if(!encounterArrayEnd){
      throw new Error('배열의 형식이 잘못 되었습니다.');
    }

    return partialResult;
  }

  analysis(){
    const firstWord = this.lexer.getWord();

    if(firstWord.type !== TokenType.ArrayStart){
      throw new Error('문장의 시작이 배열의 시작이 아닙니다.');
    }

    const result = {type: 'Array' };
    result.children = this.analysisRecursively();


    return result;
  }
}

module.exports = ArrayParser;
