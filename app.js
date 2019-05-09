const parseApp = require('./parseApp');

// const str = "['1a3', 1, [11, 123, 1], [1]]";
const str = "['1a3', 1, [11, 12, 33], [1]]";

try {
  const result = parseApp.parse(str);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.log(error.message);
}
