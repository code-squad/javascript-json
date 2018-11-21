// arrayParser step7(테스트 코드 작성) codes to test commit 2

// CodeTest class
const CodeTest = class {
    constructor() {
        this.codesToTest = require('./codesToTest.js');
    }

    // test 메소드
    testCodes(testRequirement, operateTest) {
        console.log(testRequirement);
        operateTest();
    }

    // test 결과 출력
    showTestResult(codesToTest, targetValue) {
        const expectValue = codesToTest;
        if (expectValue === targetValue) {
            console.log(`'OK' \n ============`);
            return;
        } else {
            console.log(`'FAIL'( targetValue is ${targetValue}, expectValue is ${expectValue}) \n ============`);
            return;
        }
    }
} // end class


// 객체 생성
const codeTest = new CodeTest();

// sum 
codeTest.testCodes("1 + 2 는 3을 리턴한다.", () => {
    const a = 1; b = 2;
    codeTest.showTestResult(
        codeTest.codesToTest.sum(a, b)
        , 3);
});

// 숫자 데이터 식별 
codeTest.testCodes("숫자를 인자로 넘긴 경우 true를 리턴한다.", () => {
    const token = 35;
    codeTest.showTestResult(
        codeTest.codesToTest.identifyNumber(token)
        , true);
});

// Boolean, null 데이터 식별
codeTest.testCodes("true가 인자인 경우 `[true, \"Boolean\"]`을 리턴한다.", () => {
    const token = "true";
    codeTest.showTestResult(
        codeTest.codesToTest.identifyBoolean(token)
        , `[true, "Boolean"]`);
});

// 올바른 문자열 체크
codeTest.testCodes("올바르지 않은 문자열인 경우 false를 리턴한다.", () => {
    const token = "\'ap\'ple\'";
    codeTest.showTestResult(
        codeTest.codesToTest.checkIsCorrectString(token)
        , false);
});

// 알 수 없는 타입 체크
codeTest.testCodes("따옴표가 없는 문자열인 경우 오류 메시지를 리턴한다.", () => {
    const token = "apple"
    codeTest.showTestResult(
        codeTest.codesToTest.checkIsUnknownType(token)
        , `오류를 탐지하였습니다. ${token}는 알 수 없는 타입입니다.`);
});


// 올바르지 않은 문자열 체크
codeTest.testCodes("올바르지 않은 문자열인 경우 true를 리턴한다.", () => {
    const token = "\'apple"
    codeTest.showTestResult(
        codeTest.codesToTest.checkIsIncorrectString(token)
        , true);
});

// 정상적으로 닫히지 않은 괄호 탐지
codeTest.testCodes("정상적으로 닫하지 않은 배열인 경우 true를 리턴한다", () => {
    const targetStr = "[{key : 'value'}, [10, 20, 30]"
    codeTest.showTestResult(
        codeTest.codesToTest.checkBraceStatus(targetStr)
        , true);
});