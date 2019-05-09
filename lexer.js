class Lexer {
  constructor() {

  }
  lexValue(rawValue) {
    rawValue = rawValue.trim()

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
    if (/,|[|]/){
      return rawValue
    }
    throw new Error('잘못된 값이 포함되어있습니다.')
  }
  toBoolean(rawValue) {
    return rawValue === 'true' ? true : false
  }
}

module.exports = Lexer;