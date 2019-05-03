const getTokenType = require('./tokenUtil/getTokenType');

class Tokenizer {
  constructor(text) {
    this.text = text;
    this.textIdx = 0;
  }

  isFinish(){
    return this.text.length === this.textIdx;
  }

  getToken(){
    if(this.isFinish()) throw new Error('Token analysis already finished.');

    const char = this.text[this.textIdx];
    const tokenType = getTokenType(char);

    this.textIdx++;

    return { tokenType, value: char } ;
  }

}

module.exports = Tokenizer;