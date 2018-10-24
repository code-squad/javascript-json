ArrayParser
===

### 목표
1. 프로그래밍 디버깅 능력 향상
2. 프로그래밍 설계 능력 향상
3. Javascript string, array, object에 대한 깊은 이해
4. tokenization 이해
5. 데이터구조에 대한 이해
6. 복잡한 코드의 함수나구기 연습

#### 요구사항(Step4)
- 숫자타입이외에 string, boolean, null 타입도 지원하도록 구현한다.
- 올바른 문자열이 아닌 경우 오류를 발생한다.
- 타입체크를 정규표현식을 사용하는 경우, backreference를 활용하는 것을 추천.
- 복잡한 세부로직은 함수로 분리해본다.
- 중복된 코드역시 함수로 분리해서 일반화한다.

#### 설계
**arrayParser:** 문자열을 파싱해 데이터 구조를 형성

###### - 로직 구조 -
- tokenizer -> lexer -> parser의 순서로 문자열 파싱

    1. **tokenizer**
        - 인자로 들어오는 문자열을 의미있는 유닛단위로 배열에 담는다.(여기서는 '[', ']', comma 단위로 나누었다.)
        - 새로 생성된 배열 반환(tokens)

    2. **lexer**
        - tokenizer의 반환값이 lexer 함수의 인자
        - 반환값 배열을 돌면서 token의 type과 value를 lexeme이라는 객체를 생성해 저장한다.
        - token의 type이 올바르지 않을 경우, Error 메세지를 띄운다.

    3. **parser**
        - lexer에 의해 type이 정해진 값들의 배열을 받아 데이터를 구조화한다.
        - '[' : array 생성
        - ']' : stack에 저장되어있던 가장 최상위 값 반환 및 이전에 생성된 array의 child 배열에 push된다.
        - ...rest: string, number, boolean, null 등 type에 상관없이 stack 최상위 array의 child 배열에 push된다.

- 결과
    ```
        {
            "type": "array",
            "value": "ArrayObject",
            "child": [
                {
                    "type": "string",
                    "value": "'1a3'",
                    "child": ""
                },
                {
                    "type": "array",
                    "value": "ArrayObject",
                    "child": [
                        {
                        "type": "null",
                        "value": null,
                        "child": ""
                        },
                        {
                        "type": "boolean",
                        "value": false,
                        "child": ""
                        },
                        {
                        "type": "array",
                        "value": "ArrayObject",
                        "child": [
                                {
                                "type": "string",
                                "value": "'11'",
                                "child": ""
                                },
                                {
                                "type": "array",
                                "value": "ArrayObject",
                                "child": [
                                    {
                                    "type": "number",
                                    "value": 112233,
                                    "child": ""
                                    }
                                    ]
                                },
                                {
                                "type": "number",
                                "value": 112,
                                "child": ""
                                }
                            ]
                        },
                        {
                        "type": "number",
                        "value": 55,
                        "child": ""
                        },
                        {
                        "type": "string",
                        "value": "'99'",
                        "child": ""
                        }
                    ]
                },
                {
                "type": "number",
                "value": 33,
                "child": ""
                },
                {
                "type": "boolean",
                "value": true,
                "child": ""
                }
            ]
        }
    ```
