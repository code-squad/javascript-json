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
- [] 전체 코드 classes로 변경
- [] 문자열 분석 기능 쪼개기
  - [] 토크나이저 기능 구현
  - [] 파서 기능 구현

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
2. 토큰화된 배열을 분석한다. (parser1)
    - `['[', '123', ']']` -> `['startArray', { type: number, value: 123 }, 'endArray']`
3. 분석된 토큰을 최종 결과 데이터로 만든다. (parser2)

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

### 3.3. 기능

- 문자열을 토큰으로 나눈다.

```javascript
function tokenizer(str) {
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