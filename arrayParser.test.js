// import arrayParser.js through Node.js
const testModuleObj = require('./arrayParser').testTarget;
const Lexer = testModuleObj.Class_Lexer;
const DataObj = testModuleObj.Class_DataObj;
const rules = testModuleObj.Obj_rules;
const logError = testModuleObj.Fn_logError;

class TestScenario {
    constructor({given, when, then, assertion}) {
        this.given = given; 
        this.when = when;
        this.then = then;
        this.assertion = assertion;
    }
}

function test(testTopicStr, testScenarioObj) {
    const {when, given, then, assertion} = testScenarioObj;
    const actualResult = when(...given);
    const testResult = expect(then).toBe(actualResult, assertion);
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
test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", new TestScenario({
        'given': [10, 20],
        'when': (a,b) => a+b,
        'then': 30,
        'assertion': (expected, actual) => expected === actual,
    }),
);

test("양의 정수와 음의 정수의 합이 올바르게 나온다(테스트 신뢰도 확인용 고의 오류)", new TestScenario({
        'given': [10, -10],
        'when': (a,b) => a+b,
        'then': 100,
        'assertion': (expected, actual) => expected === actual,
    }),
);

console.log(`\n
========
arrayParser 프로그램 메서드 테스트
========
`);

test("DataObj 클래스의 clone 메서드가 참조 호출이 아닌 immutable한 복사로서 작동한다", new TestScenario({
        'given': [new DataObj('testType', 'testValue')],
        'when': (DataObj) => DataObj.clone,
        'then': false,
        'assertion': (expected, actual) => (actual === actual.clone) === expected,
    }),
);

test("문자열이 입력되었을 때 뒤따르는 공백문자를 모두 제거한다", new TestScenario({
        'given': ['test       '],
        'when': rules.removeAdditionalWhiteSpace,
        'then': 'test',
        'assertion': (expected, actual) => actual === expected,
    }),
);

console.log(`\n`);
test("토큰이 입력되었을 때 올바른 토큰 타입을 배정한다", new TestScenario({
        'given': ['`'],
        'when': rules.tagTokenType,
        'then': 'stringInput',
        'assertion': (expected, actual) => actual === expected,
    }),
);
test("토큰이 입력되었을 때 올바른 토큰 타입을 배정한다 (테스트 신뢰도 확인용 고의 오류)", new TestScenario({
        'given': [':'],
        'when': rules.tagTokenType,
        'then': 'WrongType',
        'assertion': (expected, actual) => actual === expected,
    }),
);
console.log(`\n`);
test("프로그램이 종료될 때 스택에 남은 객체가 있다면 오류를 출력한다", new TestScenario({
        'given': [[{type: 'testObj', value: 'someStackObj'}], 'runtimeEnd'],
        'when': rules.checkUnclosedObject,
        'then': false,
        'assertion': (expected, actual) => actual === expected,
    }),
);
console.log(`\n`);
test("프로그램이 종료될 때 스택에 남은 객체가 있다면 오류를 출력한다 (테스트 신뢰도 확인용 고의 오류)", new TestScenario({
        'given': [[{type:'array'}], 'object'],
        'when': rules.checkUnclosedObject,
        'then': true,
        'assertion': (expected, actual) => actual === expected,
    }),
);
console.log(`\n`);
test("immutable 객체를 생성할 때 클래스가 바뀌지 않는다", new TestScenario({
        'given': [{
            stack: [
                {type: 'parentObject', child: []}, 
                new DataObj('objectProperty', {propKey: 'testVal'})
            ], 
            memory: ['valueOfProp'],
        }],
        'when': rules.object.appendKeyValPair,
        'then': DataObj,
        'assertion': (expected, actual) => actual[1] instanceof expected,
    }),
);
