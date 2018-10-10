# Array Parser

## 프로그램 설계
---

### 1. 토큰 순환 처리

작업 | 담당 메서드
---|---
문자열 형태 배열을 받아, 각각의 문자(토큰)들을 반복해서 자료 처리 메서드에 입력 | arrLexer.lexer
비슷한 유형의 토큰들이 같은 프로세스를 통과하도록 tokenType을 지정 | arrLexer.tagTokenType

### 2. 토큰 처리 과정

작업 | 담당 메서드
---|---
배열의 시작을 알리는 토큰 '['을 받아 새 자료구조를 dataBranchQueue에 추가한다. | rules.charProcessing.array['[']
숫자타입 자료 토큰이 입력되면 임시 저장소 arrLexer.tempMemory에 저장한다. 저장소가 비어있다면 새 자료구조로서, 비어있지 않다면 기존 자료구조의 값을 갱신한다. | rules.charProcessing.array['number']
요소의 입력이 끝났음을 알리는 토큰 ','이 입력되면, → 임시 저장소에 있던 자료구조를 가져오고, 해당 저장소는 비운다 → 가져온 자료구조의 value 속성을 type 속성에 맞게 변환하고 → 요소를 추가중인 배열 자료구조에 자녀 요소로서 입력한다. | rules.charProcessing.array['updateItem']
2와 3을 반복한다. | 
배열의 종료를 알리는 토큰 ']'이 입력되면 → 3번의 임시 저장 자료구조 추가 동작을 수행하고 → 현재 작업중인 자료구조를 dataBranchQueue에서 빼낸 뒤 → 임시 저장소 arrLexer.tempMemory에 저장한다. | rules.charProcessing.array[']']
만약 2번 동작 중에 새로운 '[' 토큰이 입력되면, 1번 동작부터 반복해 자녀 배열을 추가한다. | rules.charProcessing.array['[']

### 3. 생성된 자료구조 출력

작업 | 담당 메서드
---|---
2번 과정을 통해 해당 배열의 자료구조가 arrLexer.tempMemory에 저장되어 있다. | 
임시 메모리에 있는 자료구조를 통합 자료구조 저장소 arrLexer.dataTree로 저장하고 tempMemory는 비운다.| 
추가로 처리할 객체가 없으므로 dataTree 안의 자료구조를 반환하고, dataTree를 비운다.| arrLexer.lexer

### 4. 프로그램 종료