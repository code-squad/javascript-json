/********************
 * ArrayParser
 ********************
 *  [requirements]
 *  - ArrayParser함수를 만든다.
 *  - 배열안에는 숫자데이터만 존재한다.
 *  - 배열형태의 문자열을 token단위로 해석한 후, 이를 분석한 자료구조를 만든다.
 *  - 정규표현식 사용은 최소한으로 한다.(token의 타입체크에 한해 사용가능)
 */

// pipe 함수
const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

// 텍스트를 split하는 함수
const splitText = (str) => {
  return str.split("")
};

// Array가 함수인지 확인하는 함수
const checkIsArray = splitList => {
  if (checker.isArray(splitList) === 'array') {
    // return removeBracket(splitList);
    return splitList;
  } else console.error('배열형태의 문자열을 입력해주세요.');
};

// 처음과 끝을 제외한 결과를 리턴하는 함수
const removeBracket = item => {
  return item.slice(1,-1)
};

// 배열 중 공백을 제외한 token을 리턴하는 함수
const trimList = list => {
  return list.filter(item => item !== " ")
};

const checkIsComma = item => {
  if (item === ',') return true;
};

const checkIsColon = item => {
  if (item === ':') return true;
}

// 변수 타입 확인하는 함수
const checker = {
  isArray(item) {
    if (item[0] === '[' && item[item.length - 1] === ']') return 'array';
  },
  isObject(item) {
    if (item[0] === '{' && item[item.length - 1] === '}') return 'object';
  },
  isNumber(item) {
    if (item.match(/^\d+$/)) return 'number';
  },
  isNull(item) {
    if (item.match(/^null$/)) return 'null';
  },
  isBoolean(item) {
    if (item.match(/^(true|false)$/)) return 'boolean';
  },
  isString(item) {
    if (item.match(/^(['"]).*?\1$/)) {
      if (item.slice(1, -1).match(/['"]/)) {
        throw Error(`${item}은 올바른 문자열이 아닙니다.`);
      } else {
        return 'string'
      }
    };
  },
  isUnknownType(item) {
    throw Error(`${item}은 알 수 없는 타입입니다.`);
  }
}

const typeChecker = item => {
  for (type in checker) {
    let typeResult = checker[type](item);
    if (typeResult) return typeResult;
  }
}

const tokenizeList = (splitList) => {
  const type = typeChecker(splitList);
  const removedBracketList = removeBracket(splitList);
  const newItem = (type === 'array') ? [] : {};
  let [tmp, tmpKey, calcArrBrackets, calcObjBrackets] = ['', '', 0, 0];
  removedBracketList.forEach(token => {
    if (checkIsComma(token) && calcArrBrackets === 0 && calcObjBrackets === 0) {
      if (type === 'array') {
        tmp && newItem.push(tmp.trim());
      } else {
        newItem[tmpKey] = tmp.trim();
        tmpKey = '';
      }
      tmp = ''
    } else if ((token === ']' && calcArrBrackets === 0) || token === '}' && calcObjBrackets === 0) {
      tmp += token;
      if (type === 'array') {
        newItem.push(tmp.trim());
      } else {
        newItem[tmpKey] = tmp.trim();
        tmpKey = '';
      }
      tmp = ''
    } else if (token === ':' && type === 'object' && calcObjBrackets === 0) {
      tmpKey = tmp.trim();
      tmp = '';
    } else {
      token === '[' && ++calcArrBrackets;
      token === ']' && --calcArrBrackets;
      token === '{' && ++calcObjBrackets;
      token === '}' && --calcObjBrackets;
      tmp += token;
    }
  })
  if (type === 'array') {
    tmp && newItem.push(tmp.trim());
  } else {
    newItem[tmpKey] = tmp.trim();
  }
  return newItem;
}

const parseData = (splitList, initialValue = makeChild('ArrayObject', 'array')) => {
  return splitList.reduce(parseReducer, initialValue)
}

const parseReducer = (prev, curr) => {
  if (checker.isArray(curr)) {
    prev.child.push(arrayParser(curr))
  }
  else if (checker.isObject(curr)) {
    prev.child.push(makeChild('ObjectObject', 'object'));
    const currentItem = prev.child[prev.child.length - 1];
    pipe(
      splitText,
      tokenizeList,
      parseObject.bind(null, currentItem)
    )(curr)
  }
  else {
    prev.child.push(pipe(
      typeChecker,
      makeChild.bind(null, curr)
    )(curr));
  }
  return prev
}

const makeChild = (value, type, key) => {
  if (key) {
    return {type: type, objectKey: key, objectValue: value, value: []};
  }
  else {
    return {type: type, value: value, child: []};
  }
}

const arrayParser = pipe(
  splitText,
  tokenizeList,
  parseData,
)

const parseObject = (currentParseData, curr) => {
  let index = 0
  for (let key in curr) {
    currentParseData.child.push(makeChild(curr[key], typeChecker(curr[key]), key));
    if (typeChecker(curr[key]) === 'array') {
      currentParseData.child[index].value = (arrayParser(curr[key]))
    } else if (typeChecker(curr[key]) === 'object') {
      pipe(
        splitText,
        tokenizeList,
        parseObject.bind(null, currentParseData.child[index])
      )(curr)
    }
    index++;
  }
}

// const str = "[123,[22],'asd asd', [1,[2, [3]], 4, 5]]";
const str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]"
const result = arrayParser(str);
console.log('result:', JSON.stringify(result, null, 2));
