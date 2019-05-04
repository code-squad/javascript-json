const ArrayParser = require('./array_parser');

(() => {
    const str1 = "[15, 9, [7, 5], 2, [999, 11, [3, 8]], 25]";
    const str2 = "[15, 9, 7, 5, 2, 999, 11, 3, 8, 25]";
    const str3 = "[1, [2, [3], 4], 5]";
    const str4 = "[123, 22, 33]";
    const result = ArrayParser(str1);
    console.log(JSON.stringify(result, null, 2));
})();