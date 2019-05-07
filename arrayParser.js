class ArrayParser{
  constructor () {
    this.stack = []
    this.tokens = []
    this.tokenIndex = 0
  }
  textTokenize(input){
    let chars = input.split('');
    let tokens = []
    let startIndex = 0
    let stringIndex = -2
    
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
    this.tokens = tokens.filter(e=> e !== '')
    console.log(this.tokens)
    return tokens
  }
  parseWithTokens(){
    let result = {type: 'array', child: []}
    while(this.tokens.length-1 > this.tokenIndex){
      if (this.tokens[this.tokenIndex] === '['){
        this.stack.push('[')
        this.tokenIndex+=1
        result.child.push(this.parseWithTokens())
      }
      if (this.tokens[this.tokenIndex] === ']'){
        if(this.stackIsEmpty()){
          throw Error('잘못된 배열입니당')
        }
        this.stack.pop()
        this.tokenIndex+=1
        return result
      }
      result.child.push(this.lexedValue())
      this.tokenIndex+=1
    }
    return result
  }
  lexedValue(){
    let rawValue = this.tokens[this.tokenIndex].trim()
    if (!isNaN(rawValue)){
      return { type: 'number', value: Number(rawValue) }
    }
    if (rawValue === 'true' || rawValue === 'false'){
      rawValue = this.toBoolean(rawValue)
      return { type: 'boolean', value: rawValue }
    }
    if (rawValue === 'null'){
      return { type: 'null', value: null }
    }
    if (/\'|\"/.test(rawValue)){
      return { type: 'string', value: rawValue.replace(/\'/g, '') }
    }
    throw new Error('잘못된 값이 포함되어있습니다.')
  }

  stackIsEmpty(){
    return this.stack.length === 0
  }
  toBoolean(rawValue){
    return rawValue === 'true' ? true : false
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