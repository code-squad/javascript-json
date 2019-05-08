# 6-2 array parser 디자인

## parser 구현시 출력 예시

['asd',[null,false,['11',[112233],112],55, '99'],33, true]"
stack:
{ type: 'array',
  child: 
   [ { type: 'string', value: 'asd', child: [] },
     { type: 'array', 
        child: 
        [
            { type: 'object', value: 'null', child: [] },
            { type: 'boolean', value: 'false', child: [] },
            { type: 'array', child: 
                [
                    { type: 'string', value: '11', child: [] },
                    { type: 'array', child: 
                        [
                            { type: 'number', value: 112233 , child: [] },
                        ] },
                    { type: 'number', value: 112, child: [] },
                ] },
            { type: 'number', value: 55, child: [] },
            { type: 'string', value: '99', child: [] },
        ] },
     { type: 'number', value: '33', child: [] }
     { type: 'boolean', value: true, child: [] }
    ] 
}

## stack 활용을 어떻게?

기존 lexer 함수에서 구분자를 없앴던 것을 수정하여 배열 구분자를 그대로 넘기고 parser에서 배열 separator가 나올경우 큰 틀을 stack에 쌓아 이후 데이터가 나오면 stack안의 child 배열에 push하고 추가 배열이 나올 경우 큰 틀을 stack에 쌓고 이후 child 배열에 push 반복 재귀
