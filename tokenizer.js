class Tokenizer {
    constructor() {}

    removeWhiteSpace(strValue) { return strValue.replace(/\s/g, ""); }

    split(strValue) { return strValue.split(',') }
}

module.exports = Tokenizer;