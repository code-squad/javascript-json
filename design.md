arrayParser Class를 생성한 후 의미에 따라 토큰화, 의미부여, 구조화시키는 메서드를 각각 생성

## tokenize ()

문자열을 토큰으로 만들기 위해 분리

- ','로 분리하기 쉽게 '['를 '[,'로 ']'를 ',]'로 변경
- ','로 split한 새배열 생성 반환

## lex ()

- 토큰 배열 순회하면서 타입 체크, 오류 체크

## getTypeToken ()

- 토큰 타입구별하여 새로운 node 객체 생성 
- 새로운 node 객체 생성 위해 Node Class 생성
    - '[' => type array 시작 => new Node('startArray', '[')
    - 숫자 => type 숫자 => new Node('number', Number(token))
    - 문자 => type 문자 => new Node('string', token)
    - false, true => type boolean => new Node('boolean', true), new Node('boolean', false)
    - ']' => type array 종료 => new Node('endArray', ']')
    

## isCorrectString ()

- 토큰이 문자열인 경우에 잘못된 문자열 및 알수 없는 타입 체크
    -  잘못된 문자열 : 'la\'n'처럼 문자열 사이에 ' 포함되어 있는 경우 ' 갯수 파악해서 홀수이면 '잘못된 문자열입니다. 에러 반환'
    - 그 외의 경우 : 알수 없는 타입입니다. 에러 반환

## parse ()

- stack 이용
    : First In Last Out
    : '[' 만나면 새로운 객체(부모노드) 생성하여 stack에 집어 넣음
    : ']' 만나면 현재 노드(childNode : stack의 맨 위)를 빼서 그 바로 밑 부모노드(pop()했으니 이제 stack의 맨위)의 child 배열에 집어넣음
    : 아니면 계속해서 stack의 부모노드의 child 배열에 집어넣음

    위의 로직을 구현하면...
    : type이 startArray => stack에 {type : 'array', child : []} push
    : type이 endArray => stack에서 현재 노드 pop => 부모노드의 child push 즉, stack[stack.length-1].child.push(pop한 노드)
    : 아니면 stack[stack.length-1].child.push(타입 지정된 token 객체)

