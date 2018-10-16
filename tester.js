// import arrayParser.js through Node.js
const main = require('./arrayParser');

console.log(`\n========== 정상 시나리오 1 - 객체타입 처리 ==========\n`);
var s = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2));

// console.log(`\n========== 정상 시나리오 2 ==========\n`);
// var s = "['ab,12',[2580,['bbc4',5],null]       , [true, false, 'kbs2'], 595,]";
// var result = main.arrayParser(s);
// console.log(JSON.stringify(result, null, 2)); 

// console.log(`\n========== 정상 시나리오 3 - 문자열 내 특수문자 처리 ==========\n`);
// var s = "[':,[]{}!@#$%^&*(1a3',[null,false,['11',[112233]],55, '99'],33, ,true]";
// var result = main.arrayParser(s);
// console.log(JSON.stringify(result, null, 2)); 

// console.log(`\n========== 오류 시나리오 1 : 잘못된 문자열 ==========\n`);
// var s = "['12She's gone',[22,23,[11,[112233],112],55],33]";
// var result = main.arrayParser(s);
// // '12She's gone' : 올바른 문자열이 아닙니다!

// console.log(`\n========== 오류 시나리오 2 : 알 수 없는 자료형 ==========\n`);
// var s = "['1a,3',[22,23,[11,[112233],112],55],3%^&*3]";
// var result = main.arrayParser(s);
// // 3%^&*3 : 알 수 없는 타입입니다!
 
// console.log(`\n========== 오류 시나리오 2 - 1 : 알 수 없는 키워드 ==========\n`);
// var s = "['1a,3',[22,23,[11,[112233],112],55], true thy ]";
// var result = main.arrayParser(s);
// // true thy : 존재하지 않는 명령어입니다!

// console.log(`\n========== 오류 시나리오 2 - 2 : 숫자열 안의 공백문자 처리 ==========\n`);
// var s = "['1a,3',[22,23,[11,[112  233],112],55], true    ]";
// var result = main.arrayParser(s);
// // 112  233 : 알 수 없는 타입입니다!