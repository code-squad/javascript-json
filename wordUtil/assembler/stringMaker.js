const WordMaker = require('./wordMaker');
const TokenType = require('../../tokenUtil/tokenType');
const Word = require('../word');
const WordType = require('../wordType')

class StringMaker extends WordMaker {
  constructor(tokenizer){
    super(tokenizer);
  }

  makeWord(startChar){
    let word = startChar;

    const whiteList = [ 
      TokenType.Character,
      TokenType.Digit,
      TokenType.SingleQuotation,
      TokenType.DoubleQuotation,
      TokenType.Whitespace,
    ];

    while(!this.tokenizer.isFinish() ){
      const token = this.tokenizer.getToken();

      const isCorrectToken = whiteList.some(type => token.type === type);

      if(!isCorrectToken){
        throw new Error('유효하지 않은 토큰입니다.');
      }

      word += token.value;
      this.tokenizer.readyToNextTask();

      if(word.charAt(0) === word.charAt(word.length - 1)){
        break;
      }
    }

    if(word[0] !== word[word.length - 1]){
      throw new Error('유효하지 않은 토큰입니다.');
    }

    return new Word(WordType.StringType, word);
  }
}

module.exports = StringMaker;