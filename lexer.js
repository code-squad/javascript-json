const WordMakerController = require('./wordUtil/wordMakerController');

class Lexer {
  constructor(tokenizer){
    this.tokenizer = tokenizer;
    this.wordMakerController = new WordMakerController(this.tokenizer);
  }

  isFinish(){
    return this.tokenizer.isFinish();
  }

  getWord(){
    const token = this.tokenizer.getToken();
    this.tokenizer.readyToNextTask();
    const word = this.wordMakerController.getWord(token);

    return word;
  }
}


module.exports = Lexer;