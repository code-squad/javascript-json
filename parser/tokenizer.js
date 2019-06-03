const separators = require('./helper/separators');
const errorChecker = require('./error/error');

class Tokenizer {
  constructor(inputString) {
    this.splitedList = [...inputString];
    this.tokenizedList = [];
  }

  tokenizing() {
    let word = "";
    this.splitedList.forEach(letter => {
      if (this.isSeparator(letter) || letter === ',') {
        this.addTokenToList(letter, word);
        word = "";
      } else {
        word += letter
      }
    });
    this.tokenizedList = this.tokenizedList.filter( letter => letter !== '');
    return this.tokenizedList;
  }

  isSeparator(letter) {
    for (const key in separators) {
      if (key === letter) return true;
    }
  }

  addTokenToList(separator, word) {
    if (word !== "") {
      this.tokenizedList.push(word.trim());
    }
    if (separator !== ',') this.tokenizedList.push(separator);
  }
}

module.exports = Tokenizer;