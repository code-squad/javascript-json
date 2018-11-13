const { test } = require('./test');
const { expect } = require('./expect');
const { Tokenizer } = require('../tokenizer');

const tokenizer = new Tokenizer;

test('comma(,)를 기준으로 tokenizer를 실행합니다.', function () {
    const str = '[1,2,3]';
    const result = tokenizer.run(str);

    expect(result).toBe(['[', '1', '2', '3', ']']);
})

