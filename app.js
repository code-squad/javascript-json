const ArrayParser = require('./ArrayParser');

const str1 = "[123, [22, 33], 234, [-45, 0.6], '78', '6', [[null, false], true]]";
const str2 = "['12'3', [22, 33], 234, [-45, 0.6], '78', '6', [[null, false], true]]"; // invalid string error
const str3 = "[12d3, [22, 33], 234, [-45, 0.6], '78', '6', [[null, false], true]]"; // invalid type error
result = ArrayParser.parse(str1);

console.log(result);
console.log(JSON.stringify(result, null, 2));
