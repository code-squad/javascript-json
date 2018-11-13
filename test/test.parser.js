const { test } = require('./test');
const { expect } = require('./expect');
const { arrayParser } = require('../arrayparser');

test('문자열을 올바르게 파싱합니다.', function () {
    const str = "[1, true, 'code', [2,3], {a: null}]";
    const parsedData = arrayParser(str);

    expect(parsedData).toBe({
        type: 'array',
        value: 'ArrayObject',
        child: [{
            type: 'number',
            value: 1
        },
        {
            type: 'boolean',
            value: true
        },
        {
            type: 'string',
            value: 'code'
        },
        {
            type: 'array',
            value: 'ArrayObject',
            child: [
                {
                    type: 'number',
                    value: 2
                },
                {
                    type: 'number',
                    value: 3
                },
            ]
        },
        {
            type: "object",
            value: "Object",
            child: [
                {
                    type: "keyString",
                    value: "a"
                },
                {
                    type: "null",
                    value: null
                }
            ]
        }
        ]
    });
})