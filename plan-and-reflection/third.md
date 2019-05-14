# 세번째 기획

## Tokenizer 

### 문자열 하나씩 검사하는 방법으로 변경

- 문자열을 하나씩 검사한다 
  - 문자열을 split("")로 쪼개 배열로 변환하여 고차함수를 사용하는 로직을 시도해볼 수 있다.
  - for of 의 경우 문자열도 실행할 수 있으므로 배열로 만들지 않아도 되는 상황이면 for of 를 활용해도 된다. 
  - 기존 정규식을 활용한 로직을 변경한다.

```js
const context =""
const queueOfTokens = []
let tempStack = []
function tokenize(str){
  const rawToken = str.split("")
  rawToken.forEach((char, index , arr) => {
    if (isSePerator(char)) queueOfTokens.push(char);
    tempStack.push(char)
    if (isSePerator(arr[i+1])) return tempStack;
  })
}
```



### Token 정의

- `[` : startOfArray
- `]` : endOfArray 
- `,` : comma
- `:` : colon
- `{` : startOfObject
- `}`: endOfObject
- `'` : singleQuote
- `"` : doubleQuote
- "`string`": str

- `0-9` : num
- 그 외: char

## Lexer

- 기존에 없었던 객체 관련 타입에 대해서 정의 내려야 함
- "{ " , "}" , " : "

### Lexer Type

- Array -> `[...]`
- Object -> `{.. : .. , ...}`

- String → `"` + `Characters` + `"`
- Number → `consequtive digits`   | `NaN` | `Infinity`
- Boolean → `true|false`
- Null → `null`

## Parser 

0bject value를 어떻게 표현할 것인가?

{key : {type }}