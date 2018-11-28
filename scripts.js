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
  console.log(lexerResult);
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
  if (val.match(/'|"|\{/g) === null && val !== '[' && val !== ']' && isNaN(val * 1)) {
    console.log(`${val}는 알수없는 타입임니다.`);
    return true;
  }
  if (typeof val === 'string' && val !== ']') return false;
};
function getBoolean(val) {
  val = val.match(/\S\w*/g)
  return type['bool'].some(function (bool) { return bool === val[0]; });
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
  let result = { type: 'object', value: null };
  result.value = createObj(value);
  return result;
};
function createObj(value) {
  let result = {}
  let key = ''
  let val = ''
  let keyCount = 0;
  let nestedCount = 0;
  let arrayCount = 0;
  for (indx in value) {
    let token = value[indx]
    if (token === '{' && arrayCount === 0) continue;
    if (token === ' ') continue;
    if (token === '[') arrayCount++;
    if (token === '}'&& arrayCount === 0|| token === ',' && arrayCount === 0) {
      result[key] = createLiteral(val);
      key = '';
      val = '';
      keyCount = 0;
    }
    if (arrayCount !== 0) {
      val += token;
    }
    if (keyCount === 0 && token !== ':' && token !== ',') key += token;
    if (keyCount !== 0 && token !== '}' && arrayCount === 0) val += token;
    if (token === ']' && arrayCount !== 0) arrayCount--;
    if (token === ':') keyCount++;
  }
  return result;
}
function tokenize(str) {
  let result = each(str, checkToken);
  console.log(result)
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
function createLiteral(val) {
  if (isNaN(val) && val.match(/\{|\[/g) === null && val !== 'false' && val !== 'true' && val !== 'null') return String(val);
  if (!isNaN(val)) return Number(val);
  if (val === 'true' || val === 'false' || val === 'null') {
    return val === 'true' ? true : val === 'false' ? false : val === 'null' ? null : undefined;
  }
  if (val.match(/^\[/g)) return createArr(val)
  if (val.match(/\{/g)) return createObj(val);
};
function createArr(str) {
  let value = '';
  let result = [];
  let stackCount = -1;
  let endCount = 0;
  let stack = {};
  for (indx in str) {
    let token = str[indx]
    if (token === ' ') continue;
    if (indx === `${str.length - 1}`) {
      if (value.length !== 0) result.push(createLiteral(value))
      continue;
    }
    if (token === '[' && indx === '0') continue;
    if (token === '[' && indx !== '0') {
      stack[stackCount] = [];
      stackCount++;
      endCount++;
      continue;
    }
    if (token !== '[' && token !== ',' && token !== ']' && !value.match(/\{/g)) value += token;
    if (token === ',' && stackCount === -1 && !value.match(/\{/g)) {
      result.push(createLiteral(value));
      value = '';
    }
    if (value.match(/\{/g) && token !== '{') value += token;
    if (token === '}' && stackCount !== -1) {
      stack[stackCount - 1].push(createLiteral(value));
      value = '';
    }
    if (stackCount !== -1 && token === ',' && !value.match(/\{/g) && value.length !== 0 || token === ']' && value.length !== 0 && !value.match(/\{/g) && endCount !== 0) {
      stack[stackCount - 1].push(createLiteral(value));
      value = '';
      continue;
    }
    if (token === ',' && stackCount !== -1) {
      stackCount = arrReducer(stack, stackCount, result);
      continue;
    }
    if (token === ']' && stackCount !== 0) {
      stackCount = arrReducer(stack, stackCount);
      endCount++;
    }
    if (stackCount === 0 && token === ',') {
      result.push(stack[-1]);
    }
  }
  return result;
}
function arrReducer(stack, stackCount, result) {
  if (stackCount === 0) {
    result.push(stack[-1])
    stackCount--;
    return stackCount;
  }
  stack[stackCount - 2].push(stack[stackCount - 1]);
  delete stack[stackCount - 1]
  stackCount--;
  return stackCount;
}

let str = '[{name : [1,{name : 123}], dsod : "asd"},[1,[2,[3],4],5],6]';
let stack = new Stack;
let result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));