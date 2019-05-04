## Step 6-1 Array Parser - Program Description

---

### simulator.js

* **문자열을 받아서 ArrayParser 함수로 전달해주는 모듈이다.**
* 내부 정보
  * **( () => {} )( );** : 익명 즉시 함수를 실행시키면서 프로그램이 실행된다.



### array_parser.js 

* **전달받은 문자열을 Lexer, Parser를 통해 파싱할 수 있도록 중간 매개체 역할을 하는 모듈이다.**
* 내부 정보
  * **ArrayParser(str)** : Lexer 클래스의 getTokensInArray 메소드를 통해 Token 된 정보들을 얻고, Parser 클래스의 createSyntaxTree 메소드를 통해 Tree 구조의 객체를 반환하는 함수이다.



### lexer.js

* **입력받은 문자열을 Lexer 클래스 메소드를 통해 Token 정보들을 추출하는 모듈이다.**
* 내부 정보
     * **splitStringValue(str)** : 문자열 형태의 공백을 제거하고 배열로 분리해주는 메소드이다.
     * **getTokensInArray(str)** : 제일 먼저 문자열의 앞의 대괄호( '[' ) 와 뒤의 대괄호 ( ']' ) 가 존재하는지 검사를 한다. 그리고 나서 splitStringValue 메소드를 통해 ',' 문자를 기준으로 분리하고 extractTokensInformation 메소드를 통해 Token 관련 정보들을 반환하는 메소드이다.
     * **extractTokensInformation(strInArray)** : 배열 형태로 분리된 문자열들을 Token 으로 만들어주는 실직적인 Token 추출 메소드이다. checkBracketDepth 메소드에서 얻어온 대괄호의 깊이 값과 removeBracketFromStringValue 메소드에서 대괄호를 지운 문자열들 객체화하고 배열에 담아서 반환해주는 메소드이다. 반환 형태는 다음과 같다.
               ex) tokensInArray = [ { 'depth' : 0, value : '123' }, …. , { 'depth' : 0, value : '435' } ]
     * **checkBracketDepth(str)** : 클래스에서 관리하는 스택을 이용해 대괄호의 깊이를 체크해주고 깊이의 값을 반환하는 메소드이다.
     * **removeBracketFromStringValue(str)** : 현재 상태에서는 ',' 기준으로 문자열을 분리했기 때문에 완벽한 문자열이 아니다. 따라서 이 메소드는 대괄호를 제거한 후 값을 순수한 문자열을 반환하는 메소드이다.

     
### parser.js

* **Token 정보들을 SyntaxTree 로 만들어주는 모듈이다.**
* 내부 정보
  * **checkTypeOf(value)** : 인자로 들어오는 값의 type을 확인하고나서 해당 값의 type을 반환하는 메소드이다.
  * **createSyntaxTree(tokensInArray, depth)** : Token 정보와 depth 라는 매개변수를 사용하여 재귀 호출을 통해 SyntaxTree 를 만드는 알고리즘 메소드이다. ( DFS 알고리즘을 이용해서 구현했다. )
