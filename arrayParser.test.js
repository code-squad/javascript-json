`use strict`
// import arrayParser.js through Node.js
const testModuleObj = require('./arrayParser').testTarget;
const Lexer = testModuleObj.Class_Lexer;
const DataObj = testModuleObj.Class_DataObj;
const rules = testModuleObj.Obj_rules;
const logError = testModuleObj.Fn_logError;
const modelOutput = require('./tester').modelOutput;

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
    
    let actualResult = when(...given);
    
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
arrayParser - 유닛 메서드 테스트
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
test("immutable 객체를 생성할 때 클래스가 바뀌지 않는다", new TestScenario({
        'given': [{
            stack: [
                new DataObj('object').createChildArr(), 
                new DataObj('objectProperty', {propKey: 'testVal'})
            ], 
            memory: ['valueOfProp'],
        }],
        'when': rules.object.appendKeyValPair,
        'then': DataObj,
        'assertion': (expected, actual) => actual[1] instanceof expected,
    }),
);

console.log(`\n
========
arrayParser - 동작 테스트
========
`);

test("오류 처리 테스트 - 배열을 닫는 토큰을 처리할 때 스택 최상단에 객체가 있다면 오류를 반환한다", new TestScenario({
        'given': [
            'array',
            {
                token: ']',
                stack: [new DataObj('array'), new DataObj('object')],
                memory: [],
            },
            'arrayClose',
        ],
        'when': rules.process.bind(rules),
        'then': false,
        'assertion': (expected, actual) => actual === expected,
    }),
);

console.log('\n');
test("오류 처리 테스트 - 객체 속성 문자열에 키와 값 사이 콜론이 없다면 오류를 반환한다 (문제 없는 입력값 정상작동 검증)", new TestScenario({
        'given': [ // 키값 뒤에 콜론이 존재해 정상적으로 스택에 'objectProeprty' 객체가 생성된 경우
            'object',
            {
                token: '{',
                stack: [new DataObj('object'), new DataObj('objectProperty')],
                memory: [],
            },
            'objectOpen',
        ],
        'when': rules.process.bind(rules),
        'then': true,
        'assertion': (expected, actual) => actual === expected,
    }),
);
test("오류 처리 테스트 - 객체 속성 문자열에 키와 값 사이 콜론이 없다면 오류를 반환한다 (오류가 있는 입력값 오류반환 검증)", new TestScenario({
        'given': [ // 콜론이 없어 스택에 'objectProperty' 타입이 생기지 않은 채, 객체 키는 메모리에 남아있는 상태로 새 객체를 열 때 
            'object',
            {
                token: '{',
                stack: [new DataObj('object')],
                memory: [new DataObj('string')],
            },
            'objectOpen',
        ],
        'when': rules.process.bind(rules),
        'then': false,
        'assertion': (expected, actual) => actual === expected,
    }),
);

console.log('\n');
test("오류 처리 테스트 - 객체 속성 키로 객체/배열이 입력되면 오류를 반환한다 (문제 없는 입력값 정상작동 검증)", new TestScenario({
        'given': [ // 객체 자료 처리 도중, 콜론이 입력된 때 메모리에 정상적인 키값 자료형 대신 객체/배열이 들어있는 경우
            'object',
            {
                token: ':',
                stack: [new DataObj('object')],
                memory: [new DataObj('string')], // 정상적인 키값
            },
            'appendObjKey',
        ],
        'when': rules.process.bind(rules),
        'then': true,
        'assertion': (expected, actual) => actual === expected,
    }),
);
test("오류 처리 테스트 - 객체 속성 키로 객체/배열이 입력되면 오류를 반환한다 (오류가 있는 입력값 오류반환 검증)", new TestScenario({
        'given': [ // 객체 자료 처리 도중, 콜론이 입력된 때 메모리에 정상적인 키값 자료형 대신 객체/배열이 들어있는 경우
            'object',
            {
                token: ':',
                stack: [new DataObj('object')],
                memory: [new DataObj('array')], // 키값으로 배열이 입력됨
            },
            'appendObjKey',
        ],
        'when': rules.process.bind(rules),
        'then': false,
        'assertion': (expected, actual) => actual === expected,
    }),
);


console.log('\n');
test("프로그램 완결성 테스트 - 정상 입력값 테스트", new TestScenario({
        'given': ["['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]"],
        'when': new Lexer().lexer.bind(new Lexer('array')),
        'then': modelOutput,
        'assertion': (expected, actual) => JSON.stringify(actual) === JSON.stringify(expected),
    }),
);