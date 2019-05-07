class Tokenizer {
    constructor() {}

    removeWhiteSpace(strValue) { return strValue.replace(/\s/g, ""); }

    split(strValue) { return strValue.split(',') }
}

module.exports = Tokenizer;

// const tokenizer = new Tokenizer();
// console.log(tokenizer.removeWhiteSpace('[1, [2, 4], 5, [3, 5], 7, 7]'));
// console.log(tokenizer.split('[1,2,[3,4],5,6,[7]]'));