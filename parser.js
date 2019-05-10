class Parser {
  constructor() {
    this.tokenIndex = 0
    this.stack = []
    this.valueCount = 0
    this.commaCount = 0
  }
  parseWithTokens(tokens) {
    let result = { type: 'array', child: [] }
    while (tokens.length - 1 > this.tokenIndex) {
      if (tokens[this.tokenIndex] === '[') {
        this.stack.push('[')
        this.tokenIndex += 1
        result.child.push(this.parseWithTokens(tokens))
      }
      if (tokens[this.tokenIndex] === ']') {
        if(this.stackIsEmpty()) {
          throw Error('대괄호의 갯수가 맞지 않습니다.')
        }
        this.stack.pop()
        this.tokenIndex += 1
        return result
      }
      if (tokens[this.tokenIndex] === ',') {
        this.tokenIndex += 1
        this.commaCount += 1
        continue;
      }
      result.child.push(tokens[this.tokenIndex])
      this.tokenIndex += 1
      this.valueCount += 1
    }
    return result
  }
  stackIsEmpty() {
    return this.stack.length === 0
  }
  isInvalidCommas() {
    return this.commaCount + 1 !== this.valueCount
  }
}
module.exports = Parser;
