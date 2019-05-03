const tc = require('./typeChecker')

const _deleteFirstLastBraket = (arrayTypeString) => {
    return arrayTypeString.substring(1, arrayTypeString.length -1)
}

const tokenizer = (input) => {
    input = _deleteFirstLastBraket(input);
    let index = 0;
    const tokens = [];
    while (index < input.length) {
      let char = input[index];

      if (tc.isWhiteSpace(char) || tc.isComma(char)) {
        index++;
        continue;
      }
      
      if (tc.isBraket(char)) {
        tokens.push({type: 'braket', value: char,});
        index++;
        continue;
      }

      if (tc.isNumber(char)) {
        let value = '';
        while (tc.isNumber(char)) {
          value += char;
          char = input[++index];
        }
        tokens.push({ type: 'number', value });
        continue;
      }

      //TODO STPE 6-2  
      if (tc.isQuote(char)) {
        let value = '';
        char = input[++index];
        while (!tc.isQuote(char)) {
          value += char;
          char = input[++index];
        }
        char = input[++index];
        tokens.push({ type: 'string', value });
        continue;
      }
      //TODO STPE 6-2    
      if (tc.isString(char)) {
        let value = '';
        while (tc.isString(char)) {
          value += char;
          char = input[++index];
        }
        tokens.push({ type: 'name', value });
        continue;
      }

      throw new TypeError(char + "는 토근화 할 수 없는 문자 입니다.");
    }
  
    return tokens;
  }
  module.exports = tokenizer;