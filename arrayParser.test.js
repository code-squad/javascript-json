// import arrayParser.js through Node.js
const testModuleObj = require('./arrayParser').testTarget;
const Lexer = testModuleObj.Class_Lexer;
const DataObj = testModuleObj.Class_DataObj;
const rules = testModuleObj.Obj_rules;
const logError = testModuleObj.Fn_logError;

class TestScenario {
    constructor(fnToTest, fnArgsArr, expectedFnResult, comparisonMethod) {
        this.given = fnArgsArr; 
        this.when = fnToTest;
        this.then = expectedFnResult;
        this.comparisonMethod = comparisonMethod;
    }
}

function test(testTopicStr, testScenarioObj) {
    const {when, given, then, comparisonMethod} = testScenarioObj;
    const actualResult = when(...given);
    const testResult = expect(then).toBe(actualResult, comparisonMethod);
    console.log(`${testTopicStr} : ${testResult}`);
}

function expect(expectedResult) {
    return {
        'expectedResult': expectedResult,
        toBe(actualResult, comparisonMethod) {
            if ( comparisonMethod(this.expectedResult, actualResult) ) return 'OK'
            
            return `FAIL (expectedResult is ${this.expectedResult}, actualResult is ${actualResult})`;;
            
        },
    }
}

console.log(`
========
test 함수 기초 설계 검증
========
`);
let comparisonMethod = (expected, actual) => expected === actual;
const testScenario1 = new TestScenario((a,b) => a+b, [10, 20], 30, comparisonMethod) ;
test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", testScenario1);

comparisonMethod = (expected, actual) => expected === actual;
const testScenario2 = new TestScenario((a,b) => a+b, [10, -10], 100, comparisonMethod) ;
test("양의 정수와 음의 정수의 합이 올바르게 나온다(테스트 신뢰도 확인용 고의 오류)", testScenario2);


console.log(`\n
========
arrayParser 프로그램 메서드 테스트
========
`);

comparisonMethod = (expected, actual) => (actual === actual.clone) === expected ;
const testScenario3 = new TestScenario( (DataObj) => DataObj.clone, [new DataObj('testType', 'testValue')], false, comparisonMethod);
test("DataObj 클래스의 clone 메서드가 참조 호출이 아닌 immutable한 복사로서 작동한다", testScenario3);

comparisonMethod = (expected, actual) => actual === expected ;
const testScenario4 = new TestScenario(rules.removeAdditionalWhiteSpace, ['test       '], 'test', comparisonMethod);
test("문자열이 입력되었을 때 뒤따르는 공백문자를 모두 제거한다", testScenario4);

console.log(`\n`);
comparisonMethod = (expected, actual) => actual === expected ;
const testScenario6 = new TestScenario(rules.tagTokenType, ['`'], 'stringInput', comparisonMethod);
test("토큰이 입력되었을 때 올바른 토큰 타입을 배정한다", testScenario6);
comparisonMethod = (expected, actual) => actual === expected ;
const testScenario7 = new TestScenario(rules.tagTokenType, [':'], 'WrongType', comparisonMethod);
test("토큰이 입력되었을 때 올바른 토큰 타입을 배정한다 (테스트 신뢰도 확인용 고의 오류)", testScenario7);

console.log(`\n`);
comparisonMethod = (expected, actual) => actual === expected ;
const testScenario8 = new TestScenario(rules.checkUnclosedObject, [[{type: 'testObj', value: 'someStackObj'}], 'runtimeEnd'], false, comparisonMethod);
test("프로그램이 종료될 때 스택에 남은 객체가 있다면 오류를 출력한다", testScenario8);
console.log(`\n`);
comparisonMethod = (expected, actual) => actual === expected ;
const testScenario9 = new TestScenario(rules.checkUnclosedObject, [[{type:'array'}], 'object'], true, comparisonMethod);
test("프로그램이 종료될 때 스택에 남은 객체가 있다면 오류를 출력한다 (테스트 신뢰도 확인용 고의 오류)", testScenario9);

console.log(`\n`);
comparisonMethod = (expected, actual) => actual[1] instanceof expected;
const testDataObj = new DataObj('objectProperty', {propKey: 'testVal'});
const testStack = [{type: 'parentObject', child: []}, testDataObj];
const testMemory = ['valueOfProp'];
const testScenario10 = new TestScenario(rules.object.appendKeyValPair, [{stack: testStack, memory: testMemory}], DataObj, comparisonMethod);
test("immutable 객체를 생성할 때 클래스가 바뀌지 않는다", testScenario10);

