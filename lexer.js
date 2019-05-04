const TokenAssembler = require('./wordUtil/tokenAssembler');

class Lexer {
  constructor(tokenizer){
    this.tokenizer = tokenizer;
    this.tokenAssembler = new TokenAssembler(this.tokenizer);
  }

  isFinish(){
    return this.tokenizer.isFinish();
  }

  getWord(){
    const token = this.tokenizer.getToken();
    this.tokenizer.readyToNextTask();
    const word = this.tokenAssembler.getWord(token);

    return word;
  }
}


module.exports = Lexer;