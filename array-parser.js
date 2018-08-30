'use strict';

class ArrayParser {
  constructor(targetStr) {
    this.targetStr = targetStr;
    this.result;
  }

  tokenizer() {
    const tokens = [];
    let token = '';

    for (const char of this.targetStr) {
      switch (char) {
        case '[':
          tokens.push(char);
          break;
        case ']':
          this.pushToken(token, tokens);
          token = '';
          tokens.push(char);
          break;
        case ',':
          this.pushToken(token, tokens);
          token = '';
          break;
        default:
          token += char;
      }
    }
    return tokens;
  }

  pushToken(token, tokens) {
    if (token) {
      token = token.trim();
      tokens.push(token);
    }
  }
}

const str1 = '[123, 22, 33]';
const str2 = '[123,[22],33, [1,2,3,4,5]]';
const str3 = '[123,[22,23,[11,[112233],112],55],33]';

const arrayParser = new ArrayParser(str3);
const tokens = arrayParser.tokenizer();
console.log(tokens);