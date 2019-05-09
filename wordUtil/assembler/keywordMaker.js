const WordMaker = require('./wordMaker');
const keywords = require('../keywords');
const TokenType = require('../../tokenUtil/tokenType');

class KeywordMaker extends WordMaker{
  constructor(tokenizer){
    super(tokenizer);
  }

  makeWord(startChar){
    let word = startChar;

    while(!this.tokenizer.isFinish()){
      const token = this.tokenizer.getToken();

      if(token.type !== TokenType.Character) {
        break;
      }

      word += token.value;
      this.tokenizer.readyToNextTask();
    }

    const matchedKeyword = keywords.filter(keyword => keyword.value === word).pop();

    if(!matchedKeyword) {
      throw new Error('알 수 없는 토큰입니다.');
    }

    return matchedKeyword;
  }
}

module.exports = KeywordMaker;