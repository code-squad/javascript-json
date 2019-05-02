const TypeCheck = require('./type/typeCheck');

const Types = require('./type/types');

class Tokenizer {
  constructor(text) {
    this.text = text.replace(/\s/g, '');
  }

  getTokens(){
    const tokens = [];
    let lexemeBegin = 0;
    let forward = 0;
    let readyToPush = false;

    while(lexemeBegin < this.text.length){
      while(forward < this.text.length){
        let char = this.text[forward];
        if(TypeCheck.isDigit(char)){
          while(forward < this.text.length && TypeCheck.isDigit(this.text[forward])){
            forward++;
          }
          tokens.push({type: Types.Number, value: this.text.slice(lexemeBegin, forward)});
        } else if(TypeCheck.isArrayStart(char)){
          tokens.push({type: Types.ArrayStart, value: char});
          forward++;
          break;
        } else if (TypeCheck.isArrayEnd(char)){
          tokens.push({type: Types.ArrayEnd, value: char});
          forward++;
          break;
        } else if (TypeCheck.isComma(char)){
          forward++;
          break;
        } else {
          throw new Error('Undefined charater detected.');
        }
      }
      lexemeBegin = forward;
    }

    return tokens;
  }
}

module.exports = Tokenizer;