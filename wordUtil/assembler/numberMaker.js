const WordMaker = require('./wordMaker');
const TokenType = require('../../tokenUtil/tokenType');
const Word = require('../word');
const WordType = require('../wordType');

class NumberMaker extends WordMaker {
  constructor(tokenizer){
    super(tokenizer);
  }

  makeWord(startChar) {
    let word = startChar;
    let finishTask = false;

    while(!this.tokenizer.isFinish() && !finishTask){
      const token = this.tokenizer.getToken();

      if(token.type !== TokenType.Digit){
        finishTask = true;
        break;
      }

      word += token.value;
      this.tokenizer.readyToNextTask();
    }

    if(this.tokenizer.isFinish() && !finishTask){
      throw new Error('단어를 만들기 전에 텍스트의 끝에 도달했습니다.');
    }

    return new Word(WordType.NumberType, word);
  }
}

module.exports = NumberMaker;