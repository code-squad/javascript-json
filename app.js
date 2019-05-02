const Node = require('./node');

const tokenizer = {
  removeWhiteSpace: str => str.replace(/\s/g, ''),

  tokenize(str) {
    strWithoutSpace = this.removeWhiteSpace(str);
    return strWithoutSpace.split(/([\[\]])|,/).filter(Boolean);
  }
};
