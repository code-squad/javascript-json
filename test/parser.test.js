const { test, expect } = require('./mytest.js');
const { testCaseList } = require('./parser.testcase.js');
const ArrayParser = require('../array-parser.js');

const arrayParser = new ArrayParser;

// 기본 배열 데이터 분석 테스트
test(testCaseList[0].name, function () {
  const input = testCaseList[0].input;
  const output = JSON.stringify(testCaseList[0].output);

  const tokens = arrayParser.tokenize(input);
  const result = JSON.stringify(arrayParser.parse(tokens));

  expect(output).toBe(result);
})

// 2중 중첩 배열 데이터 분석 테스트
test(testCaseList[1].name, function () {
  const input = testCaseList[1].input;
  const output = JSON.stringify(testCaseList[1].output);

  const tokens = arrayParser.tokenize(input);
  const result = JSON.stringify(arrayParser.parse(tokens));

  expect(output).toBe(result);
})

// 무한 중첩 배열 데이터 분석 테스트
test(testCaseList[2].name, function () {
  const input = testCaseList[2].input;
  const output = JSON.stringify(testCaseList[2].output);

  const tokens = arrayParser.tokenize(input);
  const result = JSON.stringify(arrayParser.parse(tokens));

  expect(output).toBe(result);
})

// 여러가지 타입 지원 배열 데이터 분석 테스트
test(testCaseList[3].name, function () {
  const input = testCaseList[3].input;
  const output = JSON.stringify(testCaseList[3].output);

  const tokens = arrayParser.tokenize(input);
  const result = JSON.stringify(arrayParser.parse(tokens));

  expect(output).toBe(result);
})