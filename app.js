const parseApp = require('./parseApp');

const str = "['1a3', [null,false,['11',[112233],112],55, '99'],33, true]";

try {
  const result = parseApp.parse(str);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.log(error.message);
}
