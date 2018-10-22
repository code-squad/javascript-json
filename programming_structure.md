ArrayParser
===

### 목표
1. 프로그래밍 디버깅 능력 향상
2. 프로그래밍 설계 능력 향상
3. Javascript string, array, object에 대한 깊은 이해
4. tokenization 이해
5. 데이터구조에 대한 이해
6. 복잡한 코드의 함수나구기 연습

#### 요구사항(Step3)
- 무한중첩 구조 parsing
- 배열의 원소는 숫자타입만 존재
- 복잡한 세부로직은 함수로 분리
- 중복된 코드역시 함수로 분리

#### 설계
**arrayParser:** 문자열을 파싱해 데이터 구조를 형성

###### - 로직 구조 -
- **Stack 자료구조**를 통해 인자로 받은 문자열을 tokenizer 함수를 통해 파싱 및 데이터 구조 형성
    1. arrayParser 함수를 호출하면 tokenizer 실행한다.
    2. tokenizer 내부에 stack 객체를 생성하고, linked list를 이용하여 데이터 파싱. 
    3. Token Type에 따른 함수 로직 실행(Data Type은 'number', 'array' 존재)
    4. 'array' 경우, Node class instance를 생성하고 stack에 쌓는 구조로 실행된다.
    <hr>

- 결과
    ```
        { 
            type: 'array', 
            child: [ 
                { type: 'number', value: '123', child: [] }, 
                { type: 'number', value: '22', child: [] }, 
                { type: 'number', value: '33', child: [] } 
            ]
        }        
    ```
