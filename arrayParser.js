class ArrayParser{
  constructor () {
    this.stack = []
  }
  textTokenize(input){
    let chars = input.split('');
    let tokens = []
    let startIndex = 0
    let stringIndex = -2
    console.log('tokenizer run')
    chars.forEach((char, index) => {
      if(stringIndex > -1){
        stringIndex -=1
        return
      } 
      if(char === "'"){
        startIndex = index+1
        stringIndex = chars.slice(index+1).findIndex(e => e==="'")
        if(stringIndex < 0) throw new Error('잘못된 문자열이 포함되어있습니다.')
        tokens.push("'" + input.slice(startIndex, startIndex + stringIndex) + "'")
        startIndex +=stringIndex + 1
        console.log(input)
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
        startIndex = index+1
      }
    });
    return tokens
  }
  parseWithTokens(tokens){
    let result = {}
    if(tokens[0] === '[' && tokens.pop() === ']'){
      result = { type: 'array', child: [] }
    }
    if(tokens[0] === '{' && tokens.pop() === ']'){
      result = { type: 'object', child: {}}
    }
    tokens.forEach(token => {

    });
    return result
  }
}

module.exports = ArrayParser

// A tokenizer breaks a stream of text into tokens, 
// usually by looking for whitespace (tabs, spaces, new lines).

// A lexer is basically a tokenizer, 
// but it usually attaches extra context to the tokens -- 
// this token is a number, that token is a string literal, 
// this other token is an equality operator.

// A parser takes the stream of tokens from the lexer 
// and turns it into an abstract syntax tree representing 
// the (usually) program represented by the original text.