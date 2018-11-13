const { test } = require('./test');
const { expect } = require('./expect');
const { Tokenizer } = require('../tokenizer');

const tokenizer = new Tokenizer;

test('comma(,)를 기준으로 tokenizer를 실행합니다.', function () {
    const str = '[1,2,3]';
    const result = tokenizer.run(str);

    expect(result).toBe(['[', '1', '2', '3', ']']);
})

test('올바른 문자열이 아닐 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "['1a'3', [22,23]]";
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe("'1a'3은 올바른 문자열이 아닙니다.");
    }
})

test('배열이 안 닫힌 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "['1a3', [22,23]";
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe(`정상적으로 종료되지 않은 배열이 있습니다.`);
    }
})