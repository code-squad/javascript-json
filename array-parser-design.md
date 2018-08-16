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
- [x] ArrayParser 함수 쪼개고 리팩토링
- [x] 중첩 배열 문자열 분석할 수 있도록 프로그램 변경

## 3. 설계

### 3.1. 데이터

* 입력 문자열 분석 결과 데이터
  - type, child, value 로 이루어진 객체
  - depth 가 존재할 땐 child, 아닐 땐 value
  - 결과 예시 참고

### 3.2. 알고리즘

1. 문자열의 모든 공백을 제거한다.
    - `'[123, 22, 33]'` -> `'[123,22,33]'`
2. 아래 내용을 문자열 끝까지 반복한다.
3. `[` 일 때, 다음과 같이 동작한다.
    - 기존에 분석 중이던 배열이 있을 때 : 재귀호출하여 새로운 배열을 분석한다.
    - 기존에 분석 중이던 배열이 없을 때 : 배열을 분석한 결과 객체를 생성한다.
4. `,` 일 때, 만들어둔 토큰을 결과 객체로 변환하여 child에 넣고 토큰을 초기화한다.
5. `]` 일 때, 만들어둔 토큰을 결과 객체로 변환하여 child에 넣고 반복을 종료한다.
6. 그 외 다른 값일 때, 토큰에 추가한다.

### 3.3. 기능

- ArrayParser 함수

```javascript
function ArrayParser(str) {
  // 1. 입력받은 문자열의 공백을 제거한다.
  // 2. 공백이 제거된 문자열을 분석한다.
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
  // 1. 공백이 제거된 문자열을 위의 [3.2. 알고리즘]에 따라 분석한다.
return result;
}
```

- 토큰값에 따라 child 객체를 만드는 함수

```javascript
function getChildObj(token) {
  // 1. 토큰 타입이 객체일 때, 그대로 사용한다.
  // 2. 토큰 타입이 문자열일 때, 결과 객체 형태로 변경한다.
  return childObj;  
}
```