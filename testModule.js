// import arrayParser.js through Node.js
const testModuleObj = require('./arrayParser').testTarget;
const Lexer = testModuleObj.Class_Lexer;
const DataObj = testModuleObj.Class_DataObj;
const rules = testModuleObj.Obj_rules;
const logError = testModuleObj.Fn_logError;

class TestScenario {
    constructor(fnToTest, fnArgsArr, expectedFnResult) {
        this.given = fnArgsArr; 
        this.when = fnToTest;
        this.then = expectedFnResult;
    }
}

function test(testTopicStr, testScenarioArr) {
    const {when, given, then} = testScenarioArr;
    const actualResult = when(...given);
    const testResult = expect(then).toBe(actualResult);
    console.log(`${testTopicStr} : ${testResult}`);
}

function expect(expectedResult) {
    return {
        result: expectedResult,
        toBe(actualResult) {
            if (this.result === actualResult) return 'OK'
            
            return `FAIL (expectedResult is ${this.result}, actualResult is ${actualResult})`;;
            
        },
    }
}

console.log(`
========
test 함수 기초 설계 검증
========
`);
const testScenario1 = new TestScenario((a,b) => a+b, [10, 20], 30) ;
test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", testScenario1);

const testScenario2 = new TestScenario((a,b) => a+b, [10, -10], 100) ;
test("양의 정수와 음의 정수의 합이 올바르게 나온다(테스트 신뢰도 확인용 고의 오류)", testScenario2);


console.log(`\n
========
arrayParser 프로그램 메서드 테스트
========
`);

const testScenario3 = new TestScenario( (DataObj) => DataObj === DataObj.clone, [new DataObj('testType', 'testValue')], false );
test("DataObj 클래스의 clone 메서드가 참조 호출이 아닌 immutable한 복사로서 작동한다", testScenario3);

const testScenario4 = new TestScenario(rules.removeAdditionalWhiteSpace, ['test       '], 'test');
test("문자열이 입력되었을 때 뒤따르는 공백문자를 모두 제거한다", testScenario4);

console.log(`\n`);
const testScenario6 = new TestScenario(rules.tagTokenType, ['`'], 'stringInput');
test("토큰이 입력되었을 때 올바른 토큰 타입을 배정한다", testScenario6);
const testScenario7 = new TestScenario(rules.tagTokenType, [':'], 'WrongType');
test("토큰이 입력되었을 때 올바른 토큰 타입을 배정한다 (테스트 신뢰도 확인용 고의 오류)", testScenario7);

console.log(`\n`);
const testScenario8 = new TestScenario(rules.checkUnclosedObject, [['someStackObj'], 'runtimeEnd'], false);
test("프로그램이 종료될 때 스택에 남은 객체가 있다면 오류를 출력한다", testScenario8);
console.log(`\n`);
const testScenario9 = new TestScenario(rules.checkUnclosedObject, [[{type:'array'}], 'object'], true);
test("프로그램이 종료될 때 스택에 남은 객체가 있다면 오류를 출력한다 (테스트 신뢰도 확인용 고의 오류)", testScenario9);

// checkUnclosedObject(stack, processType){
//     const lastStackItem = rules.getLastItemOfArr(stack);
//     const bSomethingLeftOnProgramEnd = (processType === 'runtimeEnd' && !!lastStackItem);
//     const bObjectEndMismatch = (processType !== 'runtimeEnd' && processType !== lastStackItem.type);

//     if (bSomethingLeftOnProgramEnd || bObjectEndMismatch) { 
//         logError(`[Error] : 닫히지 않은 ${lastStackItem.type} 객체가 있습니다!\n[상세 정보] ${JSON.stringify(lastStackItem, null, 2)}`);
//         stack.pop() // Remove mismatched stack to prevent further error
//         return false
//     }

//     return true
// },