class Stack {
  constructor() {
    this.list = [];
    this.endCount = -1;
  }
};
function reducer(acc, cur) {
  arg = [acc, cur];
  return checkNumOrStr(...arg) || checkArray(...arg) || checkEnd(...arg) || acc;
};
function checkNumOrStr(acc, cur) {
  if (cur.type !== 'array' && cur !== ']') {
    acc.child.push(cur);
    return acc;
  }
  return false;
};
function checkArray(acc, cur) {
  if (cur.type === 'array') {
    stack.list.push(acc);
    stack.endCount++;
    acc = cur;
    return acc;
  }
  return false;
};
function checkEnd(acc, cur) {
  if (cur === ']' && stack.endCount !== 0) {
    stack.list[stack.endCount].child.push(acc);
    acc = stack.list[stack.endCount];
    stack.endCount--;
    return acc;
  }
  return false;
};
function arrayParser(str) {
  let tokenArray = lexer(tokenize, str);
  console.log('입력하신 str에 대한 분석결과는...')
  if (tokenArray) return tokenArray.reduce(reducer, tokenArray[0]);
  return [];
};
function lexer(fn, str) {
  let tokenArray = fn(str);
  if (checkSyntax(tokenArray)) return false;
  let lexerResult = tokenArray.map(mapper);
  return lexerResult;
};
function checkSyntax(tokenArray) {
  var result = tokenArray.some(v => {
    if (checkQuote(v)) return true;
    if (checkNaN(v)) return true;
  })
  return result ? true : false;
}
function checkQuote(val) {
  if (val.match(/'|"/g) !== null && val.match(/'|"/g).length % 2 !== 0) {
    console.error(`${val} 는 올바른 값이 아닙니다`)
    return true;
  }
  return false;
}
function checkNaN(val) {
  if (getBoolean(val)) return false;
  if (val.match(/'|"/g) === null && val!=='['&& val !== ']'&& isNaN(val * 1)) {
    console.log(`${val}는 알수없는 타입임니다.`)
    return true;
  }
  if (typeof val === 'string' && val !== ']') return false;
}
function getBoolean(val) {
  val = val.match(/\S\w*/g)
  return type['bool'].some(function (bool) {
    return bool === val[0];
  });
}
let type = {
  '[': { type: 'array', value: 'ArrayObject', child: [] },
  'null': { type: 'Null', value: `null`, child: [] },
  'true': { type: 'Boolean', value: `true`, child: [] },
  'false': { type: 'Boolean', value: `false`, child: [] },
  'bool': ['true', 'false', 'null']
};
function mapper(value) {
  let conversionValue = value.match(/[^\s]\w*'|[^\s]\w*/)[0];
  // checktype 에서 리턴값을 받을때 참조가 생겨 eval 로 그값을 복사하여 리턴하는 방식
  if (checktype(conversionValue)) return eval('(' + JSON.stringify(checktype(conversionValue)) + ')');
  if (Number(conversionValue)) return { type: 'number', value: `${conversionValue}`, child: [] };
  if (typeof conversionValue === 'string' && conversionValue !== ']') {
    return { type: 'string', value: `${conversionValue}`, child: [] };
  }
  return conversionValue;
};
function checktype(value) {
  if (type[value]) return type[value];
  return false;
};
function tokenize(str) {
  let result = each(str, checkToken);
  return result;
};
function each(str, iter) {
  let result = [];
  let number;
  for (i = 0; i < str.length; i++) {
    number = iter(str, result, number);
  }
  return result;
};
function checkToken(str, result, number) {
  if (number === undefined) number = '';
  if (str[i] === ']' && str[i - 1] !== ']') result.push(number);
  if (str[i].match(/\[|\]/)) result.push(`${str[i]}`);
  if (str[i].match(/[^\[\],]/)) number += str[i];
  if (str[i] === ',') {
    if (str[i - 1] === ']') {
      number = '';
    } else {
      result.push(number);
      number = '';
    }
  };
  return number;
};

let str = "['3a3',[null, false, ['11', [['null',[false]]], 'a112'],55, '99'],33,true]";
let stack = new Stack;
let result = arrayParser(str);
// console.log(result);
console.log(JSON.stringify(result, null, 2));
