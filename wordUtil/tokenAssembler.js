const TokenType = require('../tokenUtil/tokenType');
const Word = require('./word');
const WordType = require('./wordType');
const keyworks = require('./keyworks');

class TokenAssembler {
  constructor(tokenizer){
    this.tokenizer = tokenizer;
  }

  makeKeyword(char){
    let word = char;

    while(!this.tokenizer.isFinish()){
      const token = this.tokenizer.getToken();
      word += token.value;
      this.tokenizer.readyToNextTask();

      for (const keyword of keyworks){
        if(keyword.value === word){
          return keyword;
        }
      }
    }

    if(this.tokenizer.isFinish()){
      throw new Error('유효하지 않은 토큰입니다.');
    }
  }

  makeStringTypeWord(char){
    let word = char;

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

  makeNumberTypeWord(char){
    let word = char;
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

  getWord({type, value}){
    if(type === TokenType.Digit) return this.makeNumberTypeWord(value);
    if(type === TokenType.Character) return this.makeKeyword(value);
    if(type === TokenType.SingleQuotation || 
       type === TokenType.DoubleQuotation) return this.makeStringTypeWord(value);

    return new Word(type, value);
  }
}


module.exports = TokenAssembler;