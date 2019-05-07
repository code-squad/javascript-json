function check_improper_String(input, currentIndex) {
  let current = currentIndex;
  while(true) {
    currentIndex--;
    if(input[currentIndex] === '[' || input[currentIndex] === ',') {
        return print_improper_String(input, (currentIndex + 1), current);
    }
  }
}

function print_improper_String(input, index, current) {
  let merged_string = '';
  for(let i = index; i <= current; i++) {
     merged_string += input[i];
  }

  return merged_string;
} 

function check_Double_dash_and_dot(val) {
  let number_checker = []
  number_checker = val;
  let dot_counter = 0;
  let dash_counter = 0;

  for(let i = 0; i < val.length; i++) {
      if(number_checker[i] === ".") {
          dot_counter++;
      } 
      else if(number_checker[i] === '-') {
          dash_counter++;
      }
  }

  if(dot_counter === 2 || dash_counter === 2) {
      return false;
  }

  return true;
}

function tokenizer(input) {

let current = 0;
let tokens = [];

while(current < input.length) {

  let char = input[current];

  if(char === '[' || char === ']') {

      if(char === '[') {
          tokens.push({
            type: 'array',
            value: '['
      })} 
      
      else {
          tokens.push({
            type: 'array',
            value: ']'
          })
      }

      current++;

      continue;
  }      

  let WHITESPACE = /\s/;
  if(WHITESPACE.test(char)) {
      current++;
      continue;
  } 

  let COMMA = /[,]/;
  if (COMMA.test(char)) {
    current++;
    continue;
  }

  let NUMBERS = /[0-9]/ ; 
  if (NUMBERS.test(char) || char === "-") {

    let value = '';

    while (NUMBERS.test(char) || char === "." || char === "-") {
      value += char;
      char = input[++current];
    }

    let valid_Num = check_Double_dash_and_dot(value);
    if(valid_Num) {
        tokens.push({ type: 'number', value})
        continue;
    }
    else {
        throw new TypeError(`${value} 는 올바른 숫자가 아닙니다.`);
    }   
  }

  if(char === "'") {
    current++;
    let value = '';
    char = input[current];

    while(char !== "'") {
        value += char;
        if(char === ",") {
          let wrongString = check_improper_String(input, current);
          throw new TypeError(wrongString + " 은 올바른 문자열이 아닙니다.");
      }
        current++;
        char = input[current];
    }

    current++
    char = input[current];
    
    
    tokens.push({type: 'string', value});

    continue;
  }

  let LETTERS = /[a-z]/;
  if (LETTERS.test(char)) {
    let value = '';

    while (LETTERS.test(char)) {
      value += char;
      char = input[++current];
    }

    if(value === 'true' || value === 'false') {
        tokens.push({ type: 'boolean', value });
        continue;
    }
    else if(value === 'null') {
        tokens.push({ type: 'null', value });
        continue;
    } else {
        throw new TypeError(`${value}가 어떤 타입인지 알 수 없습니다.`)
    }
    

  }

  throw new TypeError('어떤 타입인지 알 수 없습니다: ' + char);
}

  return tokens;
}


module.exports = tokenizer;