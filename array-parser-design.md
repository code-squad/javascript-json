# Array Parser

## 1. 목표

- ArrayParser 함수를 만든다.
- 결과값은 배열 형태의 문자열을 분석한 자료구조이다.
- 배열이 무한으로 중첩된 경우도 분석할 수 있게 한다.
- 배열 안에는 number, string, boolean, null 타입 데이터가 존재한다.
- 올바른 문자열이 아닐 경우 다음과 같이 오류를 발생한다.
  * `'1a'3'` -> `올바른 문자열이 아닙니다.`
  * `3d3` -> `알 수 없는 타입입니다.`

```javascript
var str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
var result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));
```

- 결과 예시

```javascript
{ type: 'array',
  child:
    [ { type: 'number', value: '123' },
      { type: 'number', value: '22' },
      { type: 'array',
        child: [ { type: 'number', value: '11' },
                 { type: 'number', value: '55' }
               ] 
      }
    ] 
}
```

## 2. 계획

- [x] ArrayParser 함수 만들기
- [x] ArrayParser 함수 쪼개고 리팩토링
- [x] 중첩 배열 문자열 분석할 수 있도록 프로그램 변경
- [x] 무한 중첩 배열 문자열 분석할 수 있도록 프로그램 변경
- [x] 전체 코드 classes로 변경
- [x] 문자열 분석 기능 쪼개기
  - [x] 토크나이저 기능 구현
  - [x] 파서 기능 구현

## 3. 설계

### 3.1. 데이터

#### 3.1.1. 분석할 문자열 데이터

- number, string, boolean, null 타입의 데이터로 이루어진 배열 형태의 문자열
- 중첩된 형태일 수도 있음
- 데이터 예시 : `"['1a3',234,[false,'abc'],null,['455',true],'ex']"`

#### 3.1.2. 분석 결과 데이터

- type, child, value 로 이루어진 객체
- depth 가 존재할 땐 child, 아닐 땐 value
- 결과 예시 참고

### 3.2. 알고리즘

#### 3.2.1. 전체 알고리즘

1. 입력 문자열을 토큰화하여 배열로 만든다. (tokenizer)
    - `'[123]'` -> `['[', '123', ']']`
2. 토큰화된 배열을 분석하여 최종 결과 데이터로 만든다. (parser)

#### 3.2.2. 토크나이저 알고리즘

1. 입력 문자열 끝까지 한 글자씩 아래 내용을 수행한다.
2. `[` 일 때, 현재 글자를 결과 배열에 넣는다.
3. `]` 일 때,
    1. 토큰이 있으면 토큰을 결과 배열에 넣는다.
    2. 현재 글자를 결과 배열에 넣는다.
    3. 토큰 변수를 초기화한다.
4. `,` 일 때,
    1. 토큰이 있으면 토큰을 결과 배열에 넣는다.
    2. 토큰 변수를 초기화한다.
5. 2, 3, 4번에 해당되지 않을 때, 현재 글자를 토큰 변수에 이어붙인다.

#### 3.2.3. 파서 알고리즘

- [Point1] 스택 구조를 이용하여 자식 노드를 추가할 현재 부모 노드를 변경한다.
- [Point2] 스택의 마지막 원소가 항상 현재 부모 노드이다.

1. 입력된 토큰 배열의 마지막 원소까지 하나씩 아래 내용을 수행한다.
2. 토큰이 `[` 일 때,
    1. 새로운 부모 노드 객체를 만든다. (현재 부모 노드)
    2. 앞에서 만든 새로운 부모 노드를 스택에 추가한다.
    3. 스택에서 현재 부모 노드의 부모 노드를 찾아 연결한다.
3. 토큰이 `]` 일 때,
    1. 스택에서 현재 부모 노드의 부모 노드를 찾아 현재 부모 노드로 변경하고
    2. 이전의 부모 노드를 스택에서 삭제한다.
4. 그 외의 토큰일 때, 현재 토큰을 자식 객체로 변환하여 현재 부모 노드에 추가한다.
5. 마지막 토큰까지 위 내용을 수행한 후 최초의 부모 노드인 스택의 첫번째이자 마지막 원소를 출력한다.

### 3.3. 기능

- 문자열을 토큰으로 나눈다.

```javascript
function tokenize(str) {
  // 1. [3.2. 알고리즘]의 [토크나이저 알고리즘] 내용을 수행한다.
  return tokens;
}
```

- 토큰을 토큰 배열에 추가한다.

```javascript
function pushToken(token, tokens) {
  // 1. 토큰이 있으면,
  // 2. 토큰 앞, 뒤 공백을 제거하고
  // 3. 토큰 결과 배열에 추가한다.
}
```

- 토큰화된 배열을 분석하여 최종 결과 데이터로 만든다.

```javascript
function parse(tokens) {
  // 1. [3.2. 알고리즘]의 [파서 알고리즘] 내용을 수행한다.
  return result;
}
```

- 새로운 부모 객체를 만든다.

```javascript
function getNewParent() {
  // 1. { type: 'array', child: [] } 형태의 객체를 만들어 반환한다.
  return parentObject;
}
```

- 스택에서 현재 부모 노드의 부모를 찾아 연결한다.

```javascript
function linkToParent(parentStack) {
  // 1. 스택의 가장 마지막 요소를 두 번째 마지막 요소의 child에 push한다.
}
```

- 스택에서 이전 부모 노드를 찾아 가져온다.

```javascript
function getPreviousParent(parentStack) {
  // 1. 스택에서 현재 부모 노드인 마지막 요소를 삭제하고
  // 2. 이전 부모 노드이자 새로운 현재 부모 노드인 스택 마지막 요소를 반환한다.
  return previousParent;
}
```

- 토큰을 Child Object의 형태로 만든다.

```javascript
function getChildObject(token) {
  // 1. 토큰의 타입을 확인하여 { type: 'number', value: 123 }과 같이 만들어 반환한다.
  return childObject;
}
```

- 토큰의 타입을 판별한다.

```javascript
function getTokenType(token) {
  // 1. 토큰의 타입을 판별하여 반환한다.
  // 2. 토큰이 그 어떤 타입에도 해당되지 않으면 에러를 발생시킨다.
  return tokenType;
}
```

- 토큰이 number 타입인지 확인한다.

```javascript
function isNumber(token) {
  // 1. 토큰이 숫자로만 이루어진 문자열인지 확인하고
  // 2. true 또는 false를 반환한다.
  return boolean;
}
```

- 토큰이 boolean 타입인지 확인한다.

```javascript
function isBoolean(token) {
  // 1. 토큰이 true 또는 false로 된 문자열인지 확인하고
  // 2. true 또는 false를 반환한다.
  return boolean;
}
```

- 토큰이 string 타입인지 확인한다.

```javascript
function isString(token) {
  // 1. 토큰이 따옴표('또는")로 감싸져 있는지
  // 2. 따옴표가 2개인지 확인하고
  // 3. true 또는 false를 반환한다.
  return boolean;
}
```

- 토큰이 따옴표로 감싸져 있는지 확인한다.

```javascript
function surroundedWithQuotes(token) {
  // 1. 토큰이 '나 "로 앞, 뒤로 감싸져 있는지 확인하고
  // 2. true 또는 false를 반환한다.
  return boolean;
}
```

- 토큰이 2개의 따옴표로만 이루어져 있는지 확인한다.

```javascript
function hasTwoQuotes(token) {
  // 1. 토큰에 '나 "가 2개인지 확인하고
  // 2. true 또는 false를 반환한다.
  return boolean;
}
```

- 토큰의 에러 타입을 판별한다.

```javascript
function getErrorType(token) {
  // 1. 토큰의 에러타입을 판별하여 반환한다.
  return errorType;
}
```