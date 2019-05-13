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

    // single quote, double quote 둘 중 하나가 존재할 시, quoteStack이 비어있으면 stack에 push
    // quoteStack이 비어있지 않으면 peek()을 사용해 동일한 quote일 경우 pop, 동일하지 않을 경우 push
    pushQuoteStackTest() {
        const testCases = [
            "\"this is paired double\"",
            '\'this is paired sigle\'',
            "\' this is unpaired",
            '"this is not paired" too "'
        ]

        const expectedCases = [
            [],
            [],
            ['\''],
            ['\"']
        ]

        const arrayParser = new ArrayParser('');
        const stringArr = ['\'','\"'];

        testCases.forEach((testCase, index) => {
            const quoteStack = new Stack();
            testCase.split("").forEach((char) => {
                arrayParser.pushQuoteStack(char, quoteStack, stringArr);
            })

            test.assertArrayEquals(expectedCases[index], quoteStack.stack, this.pushQuoteStackTest);
        })
    }


    unitTest() {
        this.pushAndResetTokenTest();
        this.pushQuoteStackTest();
    }
}

const runTest = (() => {
    const test = new Test();
    test.unitTest()
})();