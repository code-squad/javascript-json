class Tokenizer {
  constructor () {
    
  }
  tokenize(input) {
    let chars = input.split('');
    let tokens = []
    let startIndex = 0
    let stringIndex = -2

    chars.forEach((char, index) => {
      if (stringIndex > -1) {
        stringIndex -=1
        return
      } 
      if (char === "'" || char === '"') {
        startIndex = index + 1
        stringIndex = chars.slice(index + 1).findIndex(e => e === char)
        if (stringIndex < 0) {
          throw new Error('잘못된 문자열이 포함되어있습니다.')
        }
        tokens.push(char + input.slice(startIndex, startIndex + stringIndex) + char)
        startIndex += stringIndex + 1
        return
      }
      if (char === '[') {
        startIndex = index + 1
        tokens.push(char)
      }
      if (char === ']' || char === ',') {
        tokens.push(input.slice(startIndex, index))
        startIndex = index + 1
        tokens.push(char)
      }
    });
    tokens = tokens.filter(e => e !== '')
    return tokens
  }
}

module.exports = Tokenizer
