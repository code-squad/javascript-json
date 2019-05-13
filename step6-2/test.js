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

    // 1.token의 첫번째 char가 quote 종류 중 하나면
    //      1. token의 마지막 char가 token의 첫번째 quote와 동일할 때 문자가 끝난 것으로 간주, token을 push
    //      2. 일치하지 않을 경우 문자열을 token에 계속 더해나감
    makeStringTokenTest() {
        const testCases = [
            '\'this is string ',
            "\"this is string ",
            '\"12345\'Token '
        ]

        const expectedCases = [
            '\'this is string token\'',
            "\"this is string token\"",
            "\"12345\'Token not Ended'"
        ]

        const chars = [
            'token\'',
            'token\"',
            'not Ended\''
        ]

        const stringArr = ['\'','\"'];
        let token = ``;
        
        const tokenArr = [];
        testCases.forEach((testStr, index) => {
            token = testStr;
            const arrayParser = new ArrayParser(testStr);
            token = arrayParser.makeStringToken(stringArr, tokenArr, token, chars[index]);
            
            test.assertEquals(expectedCases[index], token, this.makeStringTokenTest);
        })
    }




    unitTest() {
        this.pushAndResetTokenTest();
        this.pushQuoteStackTest();
        this.makeStringTokenTest();
    }
}

const runTest = (() => {
    const test = new Test();
    test.unitTest()
})();