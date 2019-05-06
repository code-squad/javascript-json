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
      (element.startsWith("'") && element.endsWith("'")) ||
      (element.startsWith('"') && element.endsWith('"'))
    );
  }

  isValidNumber(element) {
    const numberElement = Number(element);
    return typeof numberElement === 'number' && !Number.isNaN(numberElement);
  }

  isValidString(element) {
    return element.includes('"') || element.includes("'") ? false : true;
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
      word = word.substring(1, word.length - 1);

      if (!this.isValidString(word)) {
        throw new Error(`${word} 올바른 문자열이 아닙니다.`);
      }

      return {
        context: 'Element',
        newNode: this.makeNode('String', word)
      };
    }

    if (!this.isValidNumber(word)) {
      throw new Error(`${word} 알 수 없는 타입입니다.`);
    }

    return { context: 'Element', newNode: this.makeNode('Number', Number(word)) };
  }
}

module.exports = Lexer;
