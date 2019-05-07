# javascript-json
레벨2

## 개념 정리

### Tokenizer

정의된 토큰에 따라 문자열을 자르는 클래스.

### Lexer

Tokenizer가 잘라준 토큰에 의미를 붙여주는 클래스. 예를 들면, 토큰이 number, string, 또는 기타 정의된 키워드인지에 관한 정보를 추가한다.

### Parser

Lexer로부터 토큰의 스트림을 받아 Syntax tree를 만들어 낸다. Lexeme(Lexer의 결과)를 조합하여 의미있는 문장을 만들어내는 클래스이다.

## 설계

### 구조

![ArrayParser 아키텍처](https://user-images.githubusercontent.com/18232901/57295865-7351e480-7106-11e9-8247-ab7d5979e087.png)

- App.js: 프로그램 진입점으로 ArrayParser에 문자열 분석을 요청한다.
- Parser: 분석 요청을 받으면 Lexer에게 단어를 하나씩 요청하여 분석해 나간다.
- Lexer: Parser에게 단어를 건네주는 역할을 한다. Tokenizer로부터 토큰 하나를 건네 받은 다음 WordMaker에게 완전한 단어를 조립해달라고 요청한다. WordMaker로부터 단어를 받으면 이를 Parser에게 건네준다.
- WordMaker: Lexer로부터 요청을 받아 완전한 단어를 만들어 건네 준다. `WordMakerController` 클래스가 처음에 받은 토큰으로 어떤 타입의 단어를 만들어야 하는지 먼저 파악한 다음, 해당 타입의 단어를 만드는 클래스(`StringMaker`, `NumberMaker`, `KeywordMaker ` 등)에 요청하거나 직접 단어를 반환한다.
- Tokenizer: 요청을 받으면 텍스트에서 한 문자를 잘라내어 토큰의 종류와 그 문자를 함께 반환한다.

### Tokenizer

#### Token 정의

- `[` : 배열 리터럴 시작
- `]` : 배열 리터럴 끝
- `,` : 배열의 요소 구분자
- `null` : null 타입
- `NaN` : Number 타입 예약어(Not a Number)
- `Infinity` : Number 타입 예약어
- `'` : 문자열 시작 / 끝
- `"` : 문자열 시작 / 끝
- `true` : Boolean 타입 true
- `false` : Boolean 타입 false

##### 기타

- `0-9` : Digit
- 그 외: Character

### Lexer

#### 단어 정의

- String → `'|"` + `Characters` + `'|"`
- Number → `'|"` + `Digits` + `'|"` | `NaN` | `Infinity`
- Boolean → `true|false`
- Null → `null`
