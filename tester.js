// import arrayParser.js through Node.js
const main = require('./arrayParser');

var s = "['ab12',[2,['bbc4',5],3]]";
var result = main.arrayParser(s);
console.log(JSON.stringify(result, null, 2)); 

// var s = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
// var result = main.arrayParser(s);
// console.log(JSON.stringify(result, null, 2)); 

// var s = "['1a'3',[22,23,[11,[112233],112],55],33]";
// var result = main.arrayParser(s);
// //'1a'3'은 올바른 문자열이 아닙니다.

// var s = "['1a3',[22,23,[11,[112233],112],55],3d3]";
// var result = main.arrayParser(s);
// 3d3은 알수 없는 타입입니다