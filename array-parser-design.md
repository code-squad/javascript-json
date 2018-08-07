# Array Parser

## 1. 목표

- ArrayParser 함수를 만든다.
- 배열 안에는 숫자 데이터만 존재한다.
- 결과값은 배열 형태의 문자열을 분석한 자료구조이다.

```javascript
var str = "[123, 22, 33]";
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

## 3. 설계

### 3.1. 데이터

* 입력 문자열 분석 결과 데이터
  - type, child, value 로 이루어진 객체
  - depth 가 존재할 땐 child, 아닐 땐 value
  - 결과 예시 참고

### 3.2. 알고리즘

1. 입력받은 문자열의 공백을 제거
2. 아래 내용을 문자열 끝까지 반복
3. `[` 일 때, 결과에 `type:array`, `child:[]`를 추가
4. `[`, `]`, `,` 가 아닌 다른 것이면 token 변수에 추가
5. `,`, `]` 일 때, token 변수의 값을 결과 `child`에 `{ type:number, value:token` 추가
6. `child`에 token 값 추가 후 token 초기화

### 3.3. 기능

- ArrayParser 함수

```javascript
function ArrayParser(str) {
  // 1. 입력받은 문자열을 하나씩 끊어서 아래 내용을 수행한다.
  // 2. 각 문자를 판단하고, 판단 결과에 따라 결과를 추가한다.
  return result;
}
```