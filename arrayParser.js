/********************
 * ArrayParser
 ********************
 *  [requirements]
 *  - ArrayParser함수를 만든다.
 *  - 배열안에는 숫자데이터만 존재한다.
 *  - 배열형태의 문자열을 token단위로 해석한 후, 이를 분석한 자료구조를 만든다.
 *  - 정규표현식 사용은 최소한으로 한다.(token의 타입체크에 한해 사용가능)
 */

// number, boolean, string, array, object, function
const data = {
  seperator: '',
  parsedData: {
    type: '',
    child: []
  }
}
// pipe 함수
const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);

// 텍스트를 seperator 기준으로 split하는 함수
const splitText = str => str.split(data.seperator);

// Array가 함수인지 확인하는 함수
const checkIsArray = splitList => {
  if (splitList[0] === '[' && splitList[splitList.length - 1] === ']') {
    data.parsedData.type = 'array';
    const filteredList = splitList.filter(item => {
      return item !== splitList[0] && item !== splitList[splitList.length - 1] && item !== " ";
    })
    return filteredList;
  } else errorMsg();
};

const extractChild = filteredList => {
  return filteredList.join("").split(",");
}

const printData = analyzedList => {
  const result = analyzedList.map(item => {
    return {
      type: checkType(item),
      value: item
    }
  })
  data.parsedData = result;
  return JSON.stringify(data.parsedData, null, 2);
}

const checkType = token => {
  const isNumber = /^\d+$/;
  if (token.match(isNumber)) return 'number';
  else errorMsg();
}

const errorMsg = () => {
  return console.error('숫자데이터로 이루어진 배열형태의 문자열을 입력하세요.');
}

const ArrayParser = pipe(
  splitText,
  checkIsArray,
  extractChild,
  printData,
)

const str = "[123, 22, 32]";
const result = ArrayParser(str);
console.log('result:', result);
// console.log(JSON.stringify(result, null, 2));

// { type: 'array',
//   child:
//     [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] }
//     ]
// }
