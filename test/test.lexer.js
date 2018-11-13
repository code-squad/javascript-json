const { test } = require('./test');
const { expect } = require('./expect');
const { Tokenizer } = require('../tokenizer');
const { lexer } = require('../lexer');

const tokenizer = new Tokenizer;
const dataType = {
    'true': {
        type: 'boolean',
        value: true
    },
    'false': {
        type: 'boolean',
        value: false
    }
}



test('data type에 따라 lexer를 수행합니다.', function () {
    //data type에 따른 string값
    const str = "false";
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens)[0];

    expect(lexemes).toBe(dataType.true);
})