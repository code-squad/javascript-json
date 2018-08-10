# Array Parser

## 1. 목표

- ArrayParser 함수를 만든다.
- 배열 안에는 숫자 데이터만 존재한다.
- 결과값은 배열 형태의 문자열을 분석한 자료구조이다.
- 배열 안에 배열이 있는 경우도 분석한다.

```javascript
var str1 = "[123, 22, 33]";
var str2 = "[123,[22],33, [1,2,3,4,5]]";
var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));
```

- 결과 예시

```javascript
{ type: 'array',
  child: 
   [ { type: 'number', value: '123' },
     { type: 'number', value: '22' },
     { type: 'number', value: '33' }
    ] 
}
```

## 2. 계획

- [x] ArrayParser 함수 만들기
- [] ArrayParser 함수 쪼개고 리팩토링

## 3. 설계

### 3.1. 데이터

* 입력 문자열 분석 결과 데이터
  - type, child, value 로 이루어진 객체
  - depth 가 존재할 땐 child, 아닐 땐 value
  - 결과 예시 참고

### 3.2. 알고리즘

1. `'[123, 22, 33]'` -> `'[123,22,33]'` (모든 공백 제거)
2. `'[123,22,33]'` -> `[123, 22, 33]` (배열로 변경)
3. `[123, 22, 33]` -> `[{ type: 'number', value: '123' }, ...]` (배열의 각 항목을 객체로 변경)
4. 3번에서 얻은 값을 child로 넣어 최종 결과 형태로 변경

### 3.3. 기능

- ArrayParser 함수

```javascript
function ArrayParser(str) {
  // 1. 위의 [3.2. 알고리즘] 내용을 수행한다.
  return result;
}
```

- 공백 제거하는 함수

```javascript
function getTrimmedStr(str) {
  // 1. 입력받은 문자열의 앞, 뒤, 중간 모든 공백을 제거한다.
  return trimmedStr;
}
```

- 문자열을 분석하는 함수

```javascript
function parseStr(str) {
  // 공백이 제거된 문자열을 다음과 같이 분석한다.
  // 1. 문자열을 한 글자씩 끊어서 분석한다.
  // 2. [ 일 때, 배열을 만든다.
  // 3. , 또는 ] 일 때, 토큰을 숫자로 바꿔서 배열에 넣는다.
  // 4. 2, 3번에 해당하지 않는 글자는 토큰에 이어붙인다.
  // 5. 문자열 끝까지 반복한다.
return result;
}
```

- 숫자를 분석한 형태의 객체로 만드는 함수

```javascript
function getObjForNum(num) {
  // 1. 입력받은 숫자를 { type: 'number', value: 11 } 형태의 객체로 만든다.
  return objResult;
}
```

- 배열을 분석한 형태의 객체로 만드는 함수

```javascript
function getObjForArr(arr) {
  // 1. 입력받은 배열을 { type: 'array', child: 입력받은 배열 } 형태의 객체로 만든다.
  return objResult;
}
```