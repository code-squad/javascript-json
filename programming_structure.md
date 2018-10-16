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
- **Tokenizer Class**를 통해 인자로 받은 문자열의 Token Type을 확인하고 Type에 따른 메소드를 호출하여 파싱 및 데이터 구조 형성
    1. arrayParser 함수를 호출하면 tokenizer.execution 메소드를 실행한다.
    2. 문자열의 첫번째 인덱스의 값을 받아 Token Type을 확인한다. 
    3. Token Type에 따른 tokenizer 메소드를 호출 및 실행한다.(Data Type은 'number', 'array' 존재)
    <hr>

- Tokenizer Class 메소드를 통해 반환된 값을 parsedData 변수에 저장, 원하는 데이터 구조로 **변환**
    1. **dataFormat** 함수 호출
    2. 배열에 저장된 데이터 type에 따른 Data Class instance 객체 생성
        ```
        { type: 'number', value: '123', child: [] }
        ```
    3. 배열의 경우 child 프로퍼티에 트리 구조로 저장(재귀적 함수 호출)
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
