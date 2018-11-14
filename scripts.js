class Stack {
  constructor() {
    this.list = [];
    this.endCount = -1;
    this.objCount = 0;
  }
};
function tokenReducer(acc, cur) {
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
  if (cur.type !== 'array') return false;
  stack.list.push(acc);
  stack.endCount++;
  acc = cur;
  return acc;

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
  if (tokenArray) return tokenArray.reduce(tokenReducer, tokenArray[0]);
  return [];
};
function lexer(fn, str) {
  let tokenArray = fn(str);
  if (checkSyntax(tokenArray)) return false;
  let lexerResult = tokenArray.map(tokenMapper);
  return lexerResult;
};
function checkSyntax(tokenArray) {
  var result = tokenArray.some(v => {
    if (checkQuote(v)) return true;
    if (checkNaN(v)) return true;
  })
  return result ? true : false;
};
function checkQuote(val) {
  if (val.match(/'|"/g) !== null && val.match(/'|"/g).length % 2 !== 0) {
    console.error(`${val} 는 올바른 값이 아닙니다`);
    return true;
  }
  return false;
};
function checkNaN(val) {
  if (getBoolean(val)) return false;
  if (val.match(/'|"/g) === null && val !== '[' && val !== ']' && isNaN(val * 1)) {
    console.log(`${val}는 알수없는 타입임니다.`);
    return true;
  }
  if (typeof val === 'string' && val !== ']') return false;
};
function getBoolean(val) {
  val = val.match(/\S\w*/g)
  return type['bool'].some(function (bool) {
    return bool === val[0];
  });
};
const type = {
  '[': { type: 'array', value: 'ArrayObject', child: [] },
  'null': { type: 'Null', value: `null`, child: [] },
  'true': { type: 'Boolean', value: `true`, child: [] },
  'false': { type: 'Boolean', value: `false`, child: [] },
  'bool': ['true', 'false', 'null']
};
function tokenMapper(value) {
  if (value.match(/{/g)) return checkType(value, 'obj');
  let conversionValue = value.match(/[^\s]\w*('|")|[^\s]\w*/)[0]
  if (checkType(conversionValue)) return deepCopyObj(checkType(conversionValue));
  if (Number(conversionValue)) return { type: 'number', value: `${conversionValue}`, child: [] };
  if (typeof conversionValue === 'string' && conversionValue !== ']') {
    return { type: 'string', value: `${conversionValue}`, child: [] };
  }
  return conversionValue;
};
function deepCopyObj(obj) {
  let copiedObj = JSON.parse(JSON.stringify(obj));
  return copiedObj;
};
function checkType(value, obj = 0) {
  if (obj) return returnObj(value);
  if (type[value]) return type[value];
  return false;
};
function returnObj(value) {
  let result = { type: 'object', value: 'object', child: [] };
  result.child.push(JSON.parse(value));
  return result;
};
function tokenize(str) {
  let result = each(str, checkToken);
  return result;
};
function each(str, iter) {
  let result = [];
  let token;
  for (let i = 0; i < str.length; i++) {
    token = iter(str, result, token, i);
  }
  return result;
};
function checkObjToken(str, token, i) {
  if (str[i] === '{' || stack.objCount !== 0) {
    if (str[i] === '{') stack.objCount++; 
    token += str[i];
    if (str[i] === '}') stack.objCount--;
    return token;
  }
  return false;
};
function checkToken(str, result, token, i) {
  if (token === undefined) token = '';
  if (checkObjToken(str, token, i)) return checkObjToken(str, token, i);
  if (str[i] === ']' && str[i - 1] !== ']') result.push(token);
  if (str[i] === ']' || str[i] === '[') result.push(`${str[i]}`);
  if (str[i].match(/[^\[\],]/)) token += str[i];
  if (str[i] === ',' && str[i - 1] === ']') token = '';
  if (str[i] === ',' && str[i - 1] !== ']' && stack.objCount === 0) { result.push(token); token = ''; }
  return token;
};

let str = '["1a3",[{ "ke": "innervalue", "newkeys": { "a": ["1",{ "name": "arr", "arr": ["1", "2"] },"5"]}}],{"name" :1}, true]';
let stack = new Stack;
let result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));