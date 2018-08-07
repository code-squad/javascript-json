function ArrayParser(str) {
  const result = {};
  let token = '';

  const trimmedStr = str.split(' ').join('');

  for (let char of trimmedStr) {
    if (char === '[') {
      result.type = 'array';
      result.child = [];
      continue;
    }
    if (char === ',' || char === ']') {
      let childObj = { type: 'number', value: token };
      result.child.push(childObj);
      token = '';
      continue;
    }
    else token += char;
  }

  return result;
}

const str1 = '[123, 22, 33]';
const result = ArrayParser(str1);
console.log(result);