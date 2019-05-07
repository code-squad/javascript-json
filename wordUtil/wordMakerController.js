const TokenType = require('../tokenUtil/tokenType');
const Word = require('./word');

const NumberMaker = require('./assembler/numberMaker');
const StringMaker = require('./assembler/stringMaker');
const KeywordMaker = require('./assembler/keywordMaker');

class WordMakerController {
  constructor(tokenizer){
    this.numberAssembler = new NumberMaker(tokenizer);
    this.stringAssembler = new StringMaker(tokenizer);
    this.keywordAssembler = new KeywordMaker(tokenizer);
  }

  getWord({type, value}){
    switch (type) {
      case TokenType.Digit:
        return this.numberAssembler.makeWord(value);
      case TokenType.Character:
        return this.keywordAssembler.makeWord(value);
      case TokenType.SingleQuotation:
      case TokenType.DoubleQuotation:
        return this.stringAssembler.makeWord(value);
      default:
        return new Word(type, value);
    }
  }
}


module.exports = WordMakerController;