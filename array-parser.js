'use strict';

class ArrayParser {
  constructor(targetStr) {
    this.targetStr = targetStr;
    this.result;
  }

  tokenize() {
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

  parseTokens(tokens) {
    return tokens.map(token => (
      this.isBracket(token) ? token : this.getChildObject(token)
    ));
  }

  isBracket(token) {
    return ['[', ']'].includes(token);
  }

  getChildObject(token) {
    const type = this.getTokenType(token);
    const value = token;
    return {
      type,
      value
    };
  }

  getTokenType(token) {
    let typeName;
    if (this.isNumber(token)) {
      typeName = 'number';
    }
    else if (this.isBoolean(token)) {
      typeName = 'boolean';
    }
    else if (token === 'null') {
      typeName = 'null';
    }
    else if (this.isString(token)) {
      typeName = 'string';
    }
    else {
      throw `TokenTypeError: ${token}은 ${this.getErrorType(token)}입니다.`;
    }
    return typeName;
  }

  isNumber(token) {
    return !isNaN(token);
  }

  isBoolean(token) {
    return ['true', 'false'].includes(token);
  }

  isString(token) {
    return this.surroundedWithQuotes(token) && this.hasTwoQuotes(token);
  }

  surroundedWithQuotes(token) {
    const singleQuoteCase = token.startsWith(`'`) && token.endsWith(`'`);
    const doubleQuoteCase = token.startsWith(`"`) && token.endsWith(`"`);
    return singleQuoteCase || doubleQuoteCase;
  }

  hasTwoQuotes(token) {
    const singleQuoteCount = token.split(`'`).length - 1;
    const doubleQuoteCount = token.split(`"`).length - 1;
    return singleQuoteCount === 2 || doubleQuoteCount === 2;
  }

  getErrorType(token) {
    let errorType;
    if (this.surroundedWithQuotes(token)) {
      errorType = `잘못된 문자열`;
    }
    else {
      errorType = `알 수 없는 타입`;
    }
    return errorType;
  }
}

// Test Case
const str1 = '[123, 22, 33]';
const str2 = '[123,[22],33, [1,2,3,4,5]]';
const str3 = '[123,[22,23,[11,[112233],112],55],33]';
const str4 = `['1a3',[null,false,['11',[112233],112],55, '99'],33, true]`;

// Error Case
const error1 = `['1a'3',[22,23,[11,[112233],112],55],33]`;
const error2 = `['1a3',[22,23,[11,[112233],112],55],3d3]`;

// Run
const arrayParser = new ArrayParser(str4);
const tokens = arrayParser.tokenize();
const parsedTokens = arrayParser.parseTokens(tokens);
console.log(parsedTokens);