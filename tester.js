// import arrayParser.js through Node.js
const main = require('./arrayParser');

console.log(`\n========== 정상 시나리오 1 - 객체타입 처리 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));
//정상출력

console.log(`\n========== 오류 시나리오 1 - 닫히지 않은 배열 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'] , {a:'str', b:[912,[5656,33]}, true]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));
// 정상적으로 종료되지 않은 배열이 있습니다.

console.log(`\n========== 오류 시나리오 2 - 닫히지 않은 객체 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));
// 정상적으로 종료되지 않은 객체가 있습니다.

console.log(`\n========== 오류 시나리오 3 - 쌍점(콜론)이 생략된 객체 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b  [912,[5656,33]]}, true]]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));
// ':'이 누락된 객체표현이 있습니다.

console.log(`\n========== 오류 시나리오 3-1 - 키가 없는 속성값 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', 33}, true]]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));
// 키가 없는 객체 속성이 있습니다!

console.log(`\n========== 오류 시나리오 4 - 올바르지 않은 객체 키 자료형 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], { ['ObjectKeyArr']:'str', {b:1} : [912,[5656,33]]}, true]]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));
// 객체나 배열은 객체의 키가 될 수 없습니다!

const modelOutput = {
    "type": "array",
    "child": [
      {
        "value": "'1a3'",
        "type": "string"
      },
      {
        "type": "array",
        "child": [
          {
            "value": null,
            "type": "object"
          },
          {
            "value": false,
            "type": "boolean"
          },
          {
            "type": "array",
            "child": [
              {
                "value": "'11'",
                "type": "string"
              },
              {
                "value": 112,
                "type": "number"
              },
              {
                "value": "'99'",
                "type": "string"
              }
            ],
            "value": "arrayObject"
          },
          {
            "type": "object",
            "child": [
              {
                "value": {
                  "propKey": {
                    "value": "a",
                    "type": "keyword"
                  },
                  "propValue": {
                    "value": "'str'",
                    "type": "string"
                  }
                },
                "type": "objectProperty"
              },
              {
                "value": {
                  "propKey": {
                    "value": "b",
                    "type": "keyword"
                  },
                  "propValue": {
                    "type": "array",
                    "child": [
                      {
                        "value": 912,
                        "type": "number"
                      },
                      {
                        "type": "array",
                        "child": [
                          {
                            "value": 5656,
                            "type": "number"
                          },
                          {
                            "value": 33,
                            "type": "number"
                          }
                        ],
                        "value": "arrayObject"
                      }
                    ]
                  }
                },
                "type": "objectProperty"
              }
            ]
          },
          {
            "value": true,
            "type": "boolean"
          }
        ],
        "value": "arrayObject"
      }
    ]
  };

  module.exports.modelOutput = modelOutput;