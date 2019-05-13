const test = require('./testutils');
const ArrayParser  = require('./arrayparser');
const Stack = require('./stack');

const Test = class {
    constructor() {
    }

    // token을 trim 후 tokenArray에 넣음. 이후 token 값 초기화
    pushAndResetTokenTest() {
        const testCases = [
            'thisisnotTrim',
            '',
            '   ',
            '   needTrimdata   '
        ]

        const expectedCases = [
            ['thisisnotTrim'],
            [],
            [],
            ['needTrimdata']
        ]

        const arrayParser = new ArrayParser('');
        
        // push 후 token 값 reset
        testCases.forEach((testCase) =>{
            let token = testCase;
            const tokenArr = [];
            token = arrayParser.pushAndResetToken(token, tokenArr);
            test.assertEquals(``, token, this.pushAndResetTokenTest)
        })

        // 양쪽으로 여백이 존재하는 string은 trim 후 push
        testCases.forEach((testCase, index) => {
            let token = testCase;
            const tokenArr = [];
            arrayParser.pushAndResetToken(token, tokenArr);
            test.assertArrayEquals(expectedCases[index], tokenArr, this.pushAndResetTokenTest)
        })
    }

    unitTest() {
        this.pushAndResetTokenTest();
    }
}

const runTest = (() => {
    const test = new Test();
    test.unitTest()
})();