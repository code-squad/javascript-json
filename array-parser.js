'use strict';

class ArrayParser {

  tokenize(str) {
    const tokens = [];
    let token = '';

    for (const char of str) {
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

  parse(tokens) {
    const parentStack = [];
    let currentParent;

    for (const token of tokens) {
      if (token === '[') {
        currentParent = this.getNewParent();
        parentStack.push(currentParent);
        this.linkToParent(parentStack);
      }
      else if (token === ']') {
        currentParent = this.getPreviousParent(parentStack);
      }
      else {
        currentParent.child.push(this.getChildObject(token));
      }
    }
    return parentStack;
  }

  getNewParent() {
    return {
      type: 'array',
      child: []
    }
  }

  linkToParent(parentStack) {
    const lastIndex = parentStack.length - 1;
    const childNode = parentStack[lastIndex];
    const parentNode = parentStack[lastIndex - 1];

    if (parentNode) {
      parentNode.child.push(childNode);
    }
  }

  getPreviousParent(parentStack) {
    if (parentStack.length > 1) {
      parentStack.pop();
    }
    return parentStack[parentStack.length - 1];
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

// Run
if (require.main === module) {
  const str = `['1a3',[null,false,['11',[112233],112],55, '99'],33, true]`;
  const arrayParser = new ArrayParser();
  const tokens = arrayParser.tokenize(str);
  const result = arrayParser.parse(tokens);
  console.log(JSON.stringify(result, null, 2));
}

// Export
module.exports = ArrayParser;