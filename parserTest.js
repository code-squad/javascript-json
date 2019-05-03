const Parser = require("./Parser");
const parser = new Parser();

const correctData = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const correctData2 = "[1,2,3,4]";

const incorrectData1 = "['1a'3',[22,23,[11,[112233],112],55],33]";
const incorrectData2 = "['1a3',[22,23,[11,[112233],112],55],3d3]";
const incorrectData3 = "[1,2,3,4]]";

try {
  parser.getJson(correctData);
  parser.getJson(incorrectData1); //'1a'3'은 올바른 문자열이 아닙니다.
} catch (error) {
  console.log(error);
}

try {
  parser.getJson(incorrectData2);  // 3d3은 알수 없는 타입입니다
} catch (error) {
  console.log(error);
}
try {
  parser.getJson(incorrectData3);  // underflow
} catch (error) {
  console.log(error);
}

try {
  parser.getJson(correctData2);
} catch (error) {
  console.log(error);
}
