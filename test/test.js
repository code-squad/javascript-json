const expect = require('./expect');

const test = (str, fn) => {
    console.log(`${str} : `);
    fn();
}

test('두 개의 서로다른 양의 정수의 합이 올바르게 나온다', function () {
    const a = 10;
    const b = -10;
    const sum = (a, b) => {
        if (b < 0) b = 0;
        return a + b;
    };
    const result = sum(a, b);

    expect(0).toBe(result);
})