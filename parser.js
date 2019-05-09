class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.tokenIndex = 0
    this.stack = []
    this.tokenIndex = 0
  }
  parseWithTokens() {
    let result = { type: 'array', child: [] }
    while (this.tokens.length-1 > this.tokenIndex) {
      if (this.tokens[this.tokenIndex] === '[') {
        this.stack.push('[')
        this.tokenIndex+=1
        result.child.push(this.parseWithTokens())
      }
      if (this.tokens[this.tokenIndex] === ']') {
        if(this.stackIsEmpty()) {
          throw Error('대괄호의 갯수가 맞지 않습니다.')
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
  stackIsEmpty() {
    return this.stack.length === 0
  }
  lexedValue() {
    let rawValue = this.tokens[this.tokenIndex].trim()

    if (!isNaN(rawValue)) {
      return { type: 'number', value: Number(rawValue) }
    }
    if (rawValue === 'true' || rawValue === 'false') {
      rawValue = this.toBoolean(rawValue)
      return { type: 'boolean', value: rawValue }
    }
    if (rawValue === 'null') {
      return { type: 'null', value: null }
    }
    if (/\'|\"/.test(rawValue)) {
      return { type: 'string', value: rawValue.replace(/\'|\"/g, '') }
    }
    throw new Error('잘못된 값이 포함되어있습니다.')
  }
  toBoolean(rawValue) {
    return rawValue === 'true' ? true : false
  }
}
module.exports = Parser;
