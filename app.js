const ArrayParser = require('./ArrayParser');

const str = "[123, [22, 33], 234, [-45, 0.6], '78', '6', [[null, false], true]]";
result = ArrayParser.parse(str);

console.log(result);
console.log(JSON.stringify(result, null, 2));
