class Tokenizer {
  constructor () {
    
  }
  tokenize(input){
    let chars = input.split('');
    let tokens = []
    let startIndex = 0
    let stringIndex = -2

    chars.forEach((char, index) => {
      if(stringIndex > -1){
        stringIndex -=1
        return
      } 
      if(char === "'" || char === '"'){
        startIndex = index+1
        stringIndex = chars.slice(index+1).findIndex(e => e === char)
        if(stringIndex < 0) throw new Error('잘못된 문자열이 포함되어있습니다.')
        tokens.push(char + input.slice(startIndex, startIndex + stringIndex) + char)
        startIndex +=stringIndex + 1
      }
      if(char === '['){
        startIndex = index + 1
        tokens.push(char)
      }
      if(char === ']'){
        tokens.push(input.slice(startIndex, index))
        startIndex = index + 1
        tokens.push(char)
      }
      if(char === ','){
        tokens.push(input.slice(startIndex, index))
        // 쉼표 체커 만들기
        startIndex = index+1
      }
    });
    tokens = tokens.filter(e=> e !== '')
    return tokens
  }
}

module.exports = Tokenizer

// A tokenizer breaks a stream of text into tokens, 
// usually by looking for whitespace (tabs, spaces, new lines).

// A lexer is basically a tokenizer, 
// but it usually attaches extra context to the tokens -- 
// this token is a number, that token is a string literal, 
// this other token is an equality operator.

// A parser takes the stream of tokens from the lexer 
// and turns it into an abstract syntax tree representing 
// the (usually) program represented by the original text.