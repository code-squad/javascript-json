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

    // string 데이터를 유의미한 token 단위의 데이터로 분할 후 배열에 넣음
    tokenizerTest() {
        const testStr = [
            "[1,2,3,4,5]",
            "[true, false]",
            "['1a3',[null,false,['11',[112233],112],55,'99'], 33 , true]",
            '["[honux] I say \"Hello, world\""]',
        ]

        const expectedCases = [
            ['[', '1', '2', '3', '4', '5', ']'],
            ['[', 'true', 'false', ']'],
            ['[', '\'1a3\'', '[', 'null', 'false', '[', '\'11\'', '[', '112233', ']', '112', ']', '55', '\'99\'', ']', '33', 'true', ']'],
            ['[', '\"[honux] I say \"Hello, world\"\"', ']'],
        ]

        const testCases = testStr.reduce((acc, str) => {
            const arrayParser = new ArrayParser(str);
            acc.push(arrayParser.tokenizer());
            return acc;
        }, [])

        testCases.forEach((testCase, index) => {
            test.assertArrayEquals(expectedCases[index], testCase, this.tokenizerTest)
        })
    }

    // tokenzer 데이터를 type 분류 후 {type, value, child} 로 객체 생성
    lexerTest() {

        const testStr = [
            "[1,2,3,4,5]",
            "[true, false]",
            "['1a3',[null,false,['11',[112233],112],55,'99'], 33 , 'true']",
            '["[honux] I say \"Hello, world\""]',
        ]

        const expectedCases = [
            [ 
                { type: 'array', value: '[', child: [] },
                { type: 'number', value: '1', child: [] },
                { type: 'number', value: '2', child: [] },
                { type: 'number', value: '3', child: [] },
                { type: 'number', value: '4', child: [] },
                { type: 'number', value: '5', child: [] },
                { type: 'endArray', value: ']', child: [] } 
            ],
            
            [
                { type: 'array', value: '[', child: [] },
                { type: 'boolean', value: 'true', child: [] },
                { type: 'boolean', value: 'false', child: [] },
                { type: 'endArray', value: ']', child: [] } 
            ],
    
            [ 
                { type: 'array', value: '[', child: [] },
                { type: 'string', value: '\'1a3\'', child: [] },
                { type: 'array', value: '[', child: [] },
                { type: 'null', value: 'null', child: [] },
                { type: 'boolean', value: 'false', child: [] },
                { type: 'array', value: '[', child: [] },
                { type: 'string', value: '\'11\'', child: [] },
                { type: 'array', value: '[', child: [] },
                { type: 'number', value: '112233', child: [] },
                { type: 'endArray', value: ']', child: [] },
                { type: 'number', value: '112', child: [] },
                { type: 'endArray', value: ']', child: [] },
                { type: 'number', value: '55', child: [] },
                { type: 'string', value: '\'99\'', child: [] },
                { type: 'endArray', value: ']', child: [] },
                { type: 'number', value: '33', child: [] },
                { type: 'string', value: '\'true\'', child: [] },
                { type: 'endArray', value: ']', child: [] } 
            ],

            [ 
                { type: 'array', value: '[', child: [] },
                { type: 'string', value: '"[honux] I say \"Hello, world\""', child: [] },
                { type: 'endArray', value: ']', child: [] },

            ]
        ]

        const testCases = testStr.reduce((acc, str) => {
            const arrayParser = new ArrayParser(str);
            acc.push(arrayParser.lexer());
            return acc;
        }, [])
    
        testCases.forEach((testCase, index) => {
            test.assertObjArrEquals(expectedCases[index], testCase , this.lexerTest)
        })
    }

    unitTest() {
        this.pushAndResetTokenTest();
        this.pushQuoteStackTest();
        this.makeStringTokenTest();
        this.tokenizerTest();
        this.lexerTest();
    }
}

const runTest = (() => {
    const test = new Test();
    test.unitTest();
})();