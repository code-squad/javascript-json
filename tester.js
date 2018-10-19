// import arrayParser.js through Node.js
const main = require('./arrayParser');

// console.log(`\n========== 정상 시나리오 1 - 객체타입 처리 ==========\n`);
// var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]";
// var result = main.arrayParser(s);
// console.log(JSON.stringify(result, null, 2));
// //정상출력

console.log(`\n========== 오류 시나리오 1 - 닫히지 않은 배열 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'] , {a:'str', b:[912,[5656,33]}, true]";
try {var result = main.arrayParser(s);}
catch(e) {console.log(`그 외 다른 오류 ${e}`);}
// 정상적으로 종료되지 않은 배열이 있습니다.

console.log(`\n========== 오류 시나리오 2 - 닫히지 않은 객체 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]]";
try {var result = main.arrayParser(s);}
catch(e) {console.log(`그 외 다른 오류 ${e}`);}
// 정상적으로 종료되지 않은 객체가 있습니다.

console.log(`\n========== 오류 시나리오 3 - 쌍점(콜론)이 생략된 객체 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b  [912,[5656,33]]}, true]]";
try {var result = main.arrayParser(s);}
catch(e) {console.log(`그 외 다른 오류 ${e}`);}
// ':'이 누락된 객체표현이 있습니다.

console.log(`\n========== 오류 시나리오 3-1 - 키가 없는 속성값 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], {a:'str', 33}, true]]";
try {var result = main.arrayParser(s);}
catch(e) {console.log(`그 외 다른 오류 ${e}`);}
// 키가 없는 객체 속성이 있습니다!

console.log(`\n========== 오류 시나리오 4 - 올바르지 않은 객체 키 자료형 ==========\n`);
var s = "['1a3',[null,false,['11',112,'99'], { ['ObjectKeyArr']:'str', {b:1} : [912,[5656,33]]}, true]]";
try {var result = main.arrayParser(s);}
catch(e) {console.log(`그 외 다른 오류 ${e}`);}
// 객체나 배열은 객체의 키가 될 수 없습니다!