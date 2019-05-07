# javascript-json
레벨2

## ArrayParser 설계

### tokenizer.js
 * 문자열을 특정한 기준값으로 분리하는 작업을 한다. ( 공백을 제거하고 쉼표 기준으로 분리 )

 * "[1, 2, [3,  [4, 5], 6], 7]" 문자열이 존재할 때

   *  첫 번째로 "[1,2,[3,[4,5],6],7]" 형태로 공백을 제거 한다.

   *  두 번째로 ['[1', '2', '[3', '[4', '5]', '6]', '7]'] 쉼표를 기준으로 분리한다.



 ### lexer.js

 * Token의 Type을 정해주는 작업을 한다.

 * Token의 Type뿐만 아니라 Parser 클래스에서 재귀 호출을 이용한 DFS 알고리즘을 사용하기 위해서 대괄호의 깊이(depth)까지 추가했다. 

 * token 객체는 다음과 같다.

    * { 'depth' : 2, 'value' : 123, 'type' : 'number' } 

      ( depth 같은 경우는 앞에 대괄호가 몇개 존재하는지에 따라 결정 된다. )



 ### parser.js

 * lexer에서 받은 token을 Tree형태로 만들어 준다.

 * parser의 특정 메소드에서 tokenizer를 실행하고 tokenizer의 결과값을 lexer에게 넘긴다. 그리고 lexer의 결과 값을 가지고 Tree형태의 객체를 만든다.

 * 이때 재귀 호출을 이용하여 DFS 알고리즘으로 Tree를 만들어 준다.

    * { 'type' : 'array', 'child' : [ ….. ] }



### array_parser.js

* Parser에서 모든 작업이 이루어지도록 Tokenizer, Lexer 객체를 생성해서 Parser가 생성될 때 객체를 인자로 주입한다.

* array_parser.js에서 하는일은 입력값을 받고 Parser에 전달해주고 결과값을 받고 simulator에 전달해주는 역할만 하도록 한다. 



### simulator.js

 * 프로그램을 실행하는 모듈이다. 입력값을 ArrayParser 함수에 넘기고 결과값을 출력하는 역할을 한다.

