const { test } = require('./test');
const { expect } = require('./expect');
const { Tokenizer } = require('../tokenizer');
const { lexer } = require('../lexer');

test('data type: true, lexer를 수행합니다.', function () {
    const str = "true";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens)[0];

    expect(lexemes).toBe({ type: 'boolean', value: true });
})

test('data type: false, lexer를 수행합니다.', function () {
    const str = "false";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens)[0];

    expect(lexemes).toBe({ type: 'boolean', value: false });
})

test('data type: string, lexer를 수행합니다.', function () {
    const str = "'this is never that'";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens)[0];

    expect(lexemes).toBe({ type: 'string', value: 'this is never that' });
})

test('data type: number, lexer를 수행합니다.', function () {
    const str = "123456";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens)[0];

    expect(lexemes).toBe({ type: 'number', value: 123456 });
})

test('data type: array, lexer를 수행합니다.', function () {
    const str = "[1,2,3]";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens);

    expect(lexemes).toBe([
        { type: 'array', value: 'ArrayObject' }, { type: 'number', value: 1 }, { type: 'number', value: 2 }, { type: 'number', value: 3 }, { type: 'arrayClose', value: 'close' }
    ]);
})

test('data type: object, lexer를 수행합니다.', function () {
    const str = "{a: 'crong', b: [1]}";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);
    const lexemes = lexer(tokens);

    expect(lexemes).toBe([
        { type: 'object', value: 'Object' },
        { type: 'keyString', value: 'a' },
        { type: 'string', value: 'crong' },
        { type: 'keyString', value: 'b' },
        { type: 'array', value: 'ArrayObject' },
        { type: 'number', value: 1 },
        { type: 'arrayClose', value: 'close' },
        { type: 'objectClose', value: 'close' }
    ]);
})

test("type을 확인할 수 없을 시, 에러 메세지를 호출합니다.", function () {
    const str = "['torco', 3d3]";
    const tokenizer = new Tokenizer;
    const tokens = tokenizer.run(str);

    try {
        lexer(tokens);
    }
    catch (err) {
        expect(err).toBe(`3d3은 올바른 타입이 아닙니다.`);
    }
})