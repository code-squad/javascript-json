const Node = require('./node');

class Lexer {
  constructor({ keyword }) {
    this.keyword = keyword;
  }

  makeNode(type, value) {
    return new Node({
      type: type,
      value: value
    });
  }

  isString(element) {
    return (
      element.startsWith("'") ||
      element.endsWith("'") ||
      element.startsWith('"') ||
      element.endsWith('"')
    );
  }

  lex(word) {
    if (this.keyword.hasOwnProperty(word)) {
      const { context, type, value } = this.keyword[word];

      if (word === ']') {
        return { context, newNode: undefined };
      }

      return { context, newNode: this.makeNode(type, value) };
    }

    if (this.isString(word)) {
      return {
        context: 'Element',
        newNode: this.makeNode('String', word.substring(1, word.length - 1))
      };
    }

    // if (Number.isNaN(Number(word))) 에러
    return { context: 'Element', newNode: this.makeNode('Number', Number(word)) };
  }
}

module.exports = Lexer;
