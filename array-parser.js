function ArrayParser(str) {
  const trimmedStr = getTrimmedStr(str);
  const resultObj = parseStr(trimmedStr)[0];
  return resultObj;
}

function getTrimmedStr(str) {
  return str.split(' ').join('');
}

function parseStr(str) {
  let result;
  let token = '';
  let i = 0;

  while (i < str.length) {
    if (str[i] === '[') {
      if (result) {
        [token, diffIdx] = parseStr(str.slice(i));
        i += diffIdx;
      }
      else {
        result = { type: 'array', child: [] };
      }
    }
    else if (str[i] === ',') {
      result.child.push(getChildObj(token));
      token = '';
    }
    else if (str[i] === ']') {
      result.child.push(getChildObj(token));
      break;
    }
    else {
      token += str[i];
    }
    i++;
  }

  return [result, i];
}

function getChildObj(token) {
  let childObj;
  switch (typeof token) {
    case 'string':
      childObj = { type: 'number', value: +token };
      break;
    case 'object':
      childObj = token;
      break;
  }
  return childObj;
}

const str1 = '[123, 22, 33]';
const str2 = '[123,[22],33, [1,2,3,4,5]]';
const result = ArrayParser(str2);
console.log(JSON.stringify(result, null, 2));