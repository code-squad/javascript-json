

# Array Parser 만들기 2차 기획 및 회고

## 2차 기획

### Tokenizer 

- 현재 while 문으로 전개되는 tokenize 작업은 하위의 에러체크가 불가능하다. 

- split "," 함수를 써서 구별하는 법이 있으나, [ ], {}, 등은 ",'' 로 구분하기 힘들다.

- 정규표현식과 JS 의 정규식 객체 내장 메소드를 활용하여 tokenizer를 다시 만들어보자 

  - 정규식 공부가 필요하다 
  - 정규식 공부와 더불어 js regex 객체의 메소드에 대한 공부도 필요하다

- ```js
  var s = "['1a'3',[22,23,[11,[112233],112],55],33]";  //'1a'3'은 올바른 문자열이 아닙니다.
   var result = ArrayParser(str);
   ==>  //'1a'3'은 올바른 문자열이 아닙니다. 
   ===> // 'la'3' la를 쪼갠뒤에  3을 넘버로 취급하고, 그 다음 문자열의 끝을 찾아서 함수가 무한반복된다
  
  ```

- 정규식으로 구현하면 기존의 token type을 붙여줄 수 없다. 때문에 type 에 대한 처리는 온전히 lex 함수가 맡게 된다.

 ### lexer 함수

- tokenizer는 타입에 관여하지 않고 오로지 토큰화를 진행하므로 타입에 대한 처리는 lex 함수가 맡게 된다.
- 각 토큰을 인식하여 해당 토근의 type을 뱉어줄 수 있는 형태로 lex 함수의 수정이 필요하다.
- 기존의 typeChecker를 수정하여 재활용하자. lex함수가 이용하던 tokenTypeCheck 함수는 필요없게 될 수 있다.

### parse 함수

- 왜 `lexedtokens.shift()`가 `parse` 로직 밖으로 나왔는가? 코드의 의도가 분명치 않다
- 해당 부분을 고치기 위해 rootnode를 뽑아내는 로직을 parse 함수 안으로 집어넣을 필요가 있겠다
  - 그러기 위해 애초에 Array라는 루트노드를 만들어두고
  - 가장 처음과 마지막의 open, close braket 을 제외하고 tokenize 함수를 구현하는 거다.

```js
const arrayParser = (input) => {
    const lexedtokens = tokenize(input).map(v => lex(v))
    const rootNode = lexedtokens.shift(); // 왜 lexedtokens.shift가 parse 로직 밖으로 나왔는가?
    parse(rootNode, lexedtokens); 
    return rootNode;
}
```

