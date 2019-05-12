const isSeparator = require("./isSeparator");
const separators = require("./separators");

module.exports = {
  isEndofLiteral(idx, decomposedDataArr) {
    const nextLetter = decomposedDataArr[idx + 1];
    return (
      nextLetter === separators.rest ||
      nextLetter === separators.endOfArray ||
      nextLetter === separators.endOfObject ||
      nextLetter === separators.colon
    );
  },

  getTokenizedWord(letter, idx, decomposedDataArr) {
    if (isSeparator(letter)) {
      this.tokenizedWord = "";
      return letter;
    } else {
      this.tokenizedWord += letter;
      if (this.isEndofLiteral(idx, decomposedDataArr)) {
        let tokenizedWord = this.tokenizedWord.trim();
        if(tokenizedWord !== '') return tokenizedWord;
      }
    }
  },

  joinLiterals(decomposedDataArr) {
    return decomposedDataArr.map((letter, idx, arr) =>
      this.getTokenizedWord(letter, idx, arr)
    );
  },

  makeTokenizedData(decomposedDataArr) {
    const literalsJoinedArr = this.joinLiterals(decomposedDataArr);
    return literalsJoinedArr.filter(letter => letter !== undefined);
  }
}