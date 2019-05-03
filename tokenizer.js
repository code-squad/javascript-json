function tokenizer(input) {
    let index = 0;
    const tokens = [];
    while (index < input.length) {
      let char = input[index];
      const WHITESPACE = /\s/;
      const NUMBERS = /[0-9]/;
      const LETTERS = /[a-z]/i;

      if (WHITESPACE.test(char) || char === ",") {
        index++;
        continue;
      }
      
      if (char === '[') {
        tokens.push({
          type: 'braket',
          value: '[',
        });
        index++;
        continue;
      }

      if (char === ']') {
        tokens.push({
          type: 'braket',
          value: ']',
        });
        index++;
        continue;
      }

      if (NUMBERS.test(char)) {
        let value = '';
        while (NUMBERS.test(char)) {
          value += char;
          char = input[++index];
        }
        tokens.push({ type: 'number', value });
        continue;
      }
  
      if (char === '"') {
        let value = '';
        char = input[++index];
        while (char !== '"') {
          value += char;
          char = input[++index];
        }
        char = input[++index];
        tokens.push({ type: 'string', value });
        continue;
      }
  
      if (LETTERS.test(char)) {
        let value = '';
        while (LETTERS.test(char)) {
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
