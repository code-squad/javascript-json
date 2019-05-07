# javascript-json
## 설계

- tokenizer
1. 입력된값을 한 글자 단위로 current 변수로 확인.
2. 확인된 값을 크게 number, string, boolean, null, array로 분리.
3. 이 분리 과정에서:
number: quote 없이 숫자로 시작됬을때 value라는 빈 string을 만들고 숫자가 아닌 comma 혹은 다른 문자전까지 계속해서 value에 병합. 그리고, 음수, 소수 구분은, 우선 소수를 보자면 소수는 숫자가 나오고 dot이 나오기 때문에 처음 숫자인지를 확인할때는 음수 '-' 이 부호와 숫자만 확인후 그 후에 소수인지 구분할 수 있도록 처리. 그리고, --2 or 1..2 와 같은 잘못된 방식의 소수나 음수 입력시 check_Double_dash_and_dot를 이용해 오류검출.
4. boolean과 null 값은 우선적으로 String의 부분집합이기 때문에 a-z로 시작하는 문자인지 먼저 확인하고, 그 후에 값을 확인. 그리고, 'a's'이런식으로 잘못된 String을 입력했을경우 check_improper_String 메소드와 print_improper_String 메소드를 통해 오류검출.

- lexer and arrayParser
1. 우선, tokenizer 함수를 이용해 입력된 값을 token 단위로 분해한 결과값을 받는다.
2. 그리고 분해된 token의 대괄호 짝이 알맞은지 확인하고
3. 2번 조건이 true라면, Lexical_Analysis_And_Array_Parsing 메소드를 실행한다.
4. 이 메소드는 우선적으로, open bracket '[' 을 찾는다. 그리고, 
closed bracket ']' 이 나오기 전까지의 node를 return해주고 동시에 quene에 push해준다. 

NC = NodeChild                      Quene
_________________________
 NC4|   |       |        |     |                |
____|   |       |        |     |      NC1       |
     NC3|       |        |     |                |
________|       |        |     |      NC2       | 
        NC 2    |        |     |                |   
________________|        |     |      NC3       |  
               NC 1      |     |                |
                         |     |      NC4       |
_________________________|     |________________|


NC4가 quene에서 shift()되고 NC4는 NC3의 child이기 때문에 추가되어얄 할 값이 있다면 추가하고 갱신된 NC4를 NC3.child = NC4라 하고, 똑같은 방식으로 하면 NC1을 제외하고 다 shift()되고 모든 갱신된 값들이 NC1에 들어가서, arrayParser가 완성되는 구조 입니다. 그리고 갱신의 기준점은, ']'이 나오기 전 까지입니다.


const str = "['1a3',[null,false,['11',[112233],112],55,'99'],33,true]";
- 위 코드에서 처음 ']' bracket이 나오기 바로전까지의 node값은,
 
this.quene[0]
 { type: 'array', 
  child: [ { type: 'number', value: '112233', child: [] } ] }

this.quene[1]  
 { type: 'array',
   child:
    [ { type: 'string', value: '11', child: [] },
      { type: 'array', child: [Array] } ] }

this.quene[2]
 { type: 'array',
   child:
    [ { type: 'null', value: 'null', child: [] },
      { type: 'boolean', value: 'false', child: [] },
      { type: 'array', child: [Array] } ] }

this.quene[3]
 { type: 'array',
   child:
    [ { type: 'string', value: '1a3', child: [] },
      { type: 'array', child: [Array] } ] }
