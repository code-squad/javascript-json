const { test } = require('./test');
const { expect } = require('./expect');
const { Tokenizer } = require('../tokenizer');

test('comma(,)를 기준으로 tokenizer를 실행합니다.', function () {
    const str = '[1,2,3]';
    const tokenizer = new Tokenizer;
    const result = tokenizer.run(str);

    expect(result).toBe(['[', '1', '2', '3', ']']);
})

test('올바른 문자열이 아닐 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "['1a'3', [22,23]]";
        const tokenizer = new Tokenizer;
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe("'1a'3은 올바른 문자열이 아닙니다.");
    }
})

test('배열이 안 닫힌 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "['1a3', [22,23]";
        const tokenizer = new Tokenizer;
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe(`정상적으로 종료되지 않은 배열이 있습니다.`);
    }
})

test('객체 안 닫힌 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "{a:'str', b: [912,[5656,33]]";
        const tokenizer = new Tokenizer;
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe(`정상적으로 종료되지 않은 객체가 있습니다.`);
    }
})

test('key가 정의되지 않은 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "{ :'str', b: [912,[5656,33]]";
        const tokenizer = new Tokenizer;
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe(`key가 정의되지 않았습니다.`);
    }
})

test('value가 정의되지 않은 경우, 에러 메세지를 호출합니다.', function () {
    try {
        const str = "{ a: 12, b: }";
        const tokenizer = new Tokenizer;
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe(`b의 value가 정의되지 않았습니다.`);
    }
})

test("':' 가 누락 될 경우, 에러 메세지를 호출합니다.", function () {
    try {
        const str = "{a:'str', b  [912,[5656,33]]}";
        const tokenizer = new Tokenizer;
        tokenizer.run(str);
    }
    catch (err) {
        expect(err).toBe(`':'이 누락된 객체표현이 있습니다.`);
    }
})