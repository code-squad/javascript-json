const errorCheck = require('./errorCheck')

const errorChecker = new errorCheck();

class arrayTokenizer {
    constructor(input) {
        this.input = input;
        this.current = 0;
        this.tokens = [];
    }

    tokenizer() {
        while(this.current < this.input.length) {

          let char = this.input[this.current];

          if(char === '[' || char === ']') {

              if(char === '[') {
                  this.tokens.push({
                    type: 'array',
                    value: '['
              })} 
              
              else {
                  this.tokens.push({
                    type: 'array',
                    value: ']'
                  })
              }

              this.current++;

              continue;
          }      

          let WHITESPACE = /\s/;
          if(WHITESPACE.test(char)) {
              this.current++;
              continue;
          } 

          let COMMA = /[,]/;
          if (COMMA.test(char)) {
            this.current++;
            continue;
          }

          let NUMBERS = /[0-9]/ ; 
          if (NUMBERS.test(char) || char === "-") {

            let value = '';

            while (NUMBERS.test(char) || char === "." || char === "-") {
              value += char;
              char = this.input[++this.current];
            }

            let valid_Num = errorChecker.check_Double_dash_and_dot(value);
            if(valid_Num) {
                this.tokens.push({ type: 'number', value})
                continue;
            }
            else {
                throw new TypeError(`${value} 는 올바른 숫자가 아닙니다.`);
            }   
          }

          if(char === "'") {
            this.current++;
            let value = '';
            char = this.input[this.current];

            while(char !== "'") {
                value += char;
                if(char === ",") {
                  let wrongString = errorChecker.check_improper_String(input, current);
                  throw new TypeError(wrongString + " 은 올바른 문자열이 아닙니다.");
              }
                this.current++;
                char = this.input[this.current];
            }

            this.current++
            char = this.input[this.current];
            
            
            this.tokens.push({type: 'string', value});

            continue;
          }

          let LETTERS = /[a-z]/;
          if (LETTERS.test(char)) {
            let value = '';

            while (LETTERS.test(char)) {
              value += char;
              char = this.input[++this.current];
            }

            if(value === 'true' || value === 'false') {
                this.tokens.push({ type: 'boolean', value });
                continue;
            }
            else if(value === 'null') {
                this.tokens.push({ type: 'null', value });
                continue;
            } else {
                throw new TypeError(`${value}가 어떤 타입인지 알 수 없습니다.`)
            }
            

          }

          throw new TypeError('어떤 타입인지 알 수 없습니다: ' + char);
        }

          return this.tokens;
      }
}

module.exports = arrayTokenizer;