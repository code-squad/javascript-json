const ArrayParser = require('./array_parser');

(() => {
    const str = '[123, 22, 33]';
    const result = ArrayParser(str);
    console.log(JSON.stringify(result, null, 2));
})();