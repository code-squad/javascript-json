

# ArrayParser 설계

1. tokenizer : 입력값(stream)을 token으로 분리 한다. (공백 제거 작업 후 쉼표를 기준으로 토큰 분리)
2. lexer : token의 타입(type)을 정해준다. (number, string, '[', ']', null, bollean 등)
3. parser : lexer에게 받은 tokens을 AST(Abstract Syntax Tree)로 변환한다.



```javascript
str = "[123,[2,34],567,-89]"

// 입력값을 token으로 분리한다.
tokenizer => [ '[', '123', '[', '2', '34', ']', '567', '-89', ']' ]

// Node 안에 token의 type과 value를 담는다.
lexer => 
[ Node { type: 'arrStart', value: '[', child: [] },
  Node { type: 'number', value: '123', child: [] },
  Node { type: 'arrStart', value: '[', child: [] },
  Node { type: 'number', value: '2', child: [] },
  Node { type: 'number', value: '34', child: [] },
  Node { type: 'arrEnd', value: ']', child: [] },
  Node { type: 'number', value: '567', child: [] },
  Node { type: 'number', value: '-89', child: [] },
  Node { type: 'arrEnd', value: ']', child: [] } ]
  
// lexedData를 Queue에 담는다.

// 중첩된 배열을 parentNode로 분리하여 roodNode에 담는다.  
parser =>
Node {
  type: 'Array',
  value: undefined,
  child:
   [ Node { type: 'number', value: '123', child: [] },
     Node { type: 'childeArray', value: '[', child: [Array] },
     Node { type: 'number', value: '567', child: [] },
     Node { type: 'number', value: '-89', child: [] } ] }
```



ArrayPaser 프로세스

1. Queue에 담긴 노드 중 맨 앞 노드를 shift한다.
2. 이 첫번째 노드가 rootNode가 된다.
3. Queue에서 하나씩 shift 하며 rootNode의 child에 push 한다.
4. 중간에 `'['` 를 만나면 해당 노드를 parentNode로 해서 3번을 반복한다. (재귀이용)
5. `']'` 를 만나면 해당 parentNode를 리턴한다.