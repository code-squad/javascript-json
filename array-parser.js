function ArrayParser(str) {
  const trimmedStr = getTrimmedStr(str);
  const arrayData = parseStr(trimmedStr);
  const childArray = arrayData.map(getObjForNum);
  const resultObj = getObjForArr(childArray);
  return resultObj;
}

function getTrimmedStr(str) {
  return str.split(' ').join('');
}

function parseStr(str) {
  let result;
  let token = '';

  for (let char of str) {
    if (char === '[') result = [];
    else if (char === ',' || char === ']') {
      result.push(+token);
      token = '';
    }
    else token += char;
  }

  return result;
}

function getObjForNum(num) {
  return { type: 'number', value: num };
}

function getObjForArr(arr) {
  return { type: 'array', child: arr }
}

const str1 = '[123, 22, 33]';
const result = ArrayParser(str1);
console.log(result);