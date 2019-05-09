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
    if (/,|\[|\]/.test(rawValue)){
      return rawValue
    }
    throw new Error(`${rawValue}는 잘못된 값입니다.`)
  }
  toBoolean(rawValue) {
    return rawValue === 'true' ? true : false
  }
}

module.exports = Lexer;