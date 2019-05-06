# parser 만들기 design

## 1차 design
1. input readline 설정하여 input 받도록.
2. 실행함수 `init()` 생성
3. 입력받은 문자열 token 단위로 쪼개는 함수 `tokenizer` 생성
4. 같은 type끼리 묶는 lexer 함수 `lexer()` 생성
5. 전체 type 설정 및 최종 value를 반환하는 함수 `parser()`생성
6. 결과값 type, value 등을 출력하는 함수 `print()` 생성

## 2차 design
1. 실행함수 `init()` 생성
   - parser 함수 호출
   - input받은 문자열 전달
2. 실행함수 `tokenizer()` 생성
    - 입력 받은 문자열 split하여 같은 문자열을 묶고 배열 구분 기호를 나누고, space와 comma 등의 불필요한 구분 기호는 filtering 하는 작업.
2. 같은 type끼리 묶는 lexer 함수 `lexer()` 생성
   - token 별 내부의 타입과 value를 배열로 반환
   - 배열 구분기호의 경우 삭제하고 배열로 설정
3. 전체 type 설정 및 최종 value를 반환하는 함수 `parser()`생성
   - 객체 내부에 type과 child 설정.
   - 각 child 안에 현재 배열의 type, value, child property를 설정
4. `print()`
   - 배출 타입, 각 value의 타입, value 를 출력하도록 console.log 메소드 사용

## 3차 design

1. node input 가능 코드 (삭제)
   
```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

2. ` tokenizer()` sudo (추가)
    - token별로 문자를 합치거나 쪼개는 역할

3. `init()` sudo (삭제)

```js
const init =  함수() {
readline.question('문구', (input) => {
    parser(input)
})
parser(input);
}
```

4. `lexer()` sudo

```js
const lexer = 함수(input) {
    첫번째변수명 = input 쪼개기 (split('') 사용);
    두번째변수명 = 구분기호 배열
    세번째변수명 = 숫자 배열
    네번째변수명 = 알파벳 배열
    다섯번째변수명 = 첫번째변수명.reduce() -> '[', ']', '{', '}'는 요소의 가장 앞과 끝에 위치하도록 배치
    '[', ']', '{', '}' 내부의 요소들 중 연속된 요소들을 묶는 작업 진행 (string과 number 구분)
    return 다섯번째변수명
}
```

5. `parser()` sudo

```js
const parser = 함수(input) {
    첫번째변수명 = lexer(input);
    두번째변수명;
    세번째변수명 = 숫자배열
    네번째변수명 = 첫번째변수명.forEach( letter => {
        if(letter === '[' or '{') 두번째변수명 배열선언
        if(letter === ']'or '}') return
        if(letter === 세번째배열.includes()) parseInt();
    })
    print함수(네번재변수명)
}
```

<!-- 5. print 함수 (추가 후 삭제) - parser의 역할로 설정

```js
const print(배열또는객체) {
    첫번째변수 = isArray() || typeof
    두번째변수 = {type: 첫번재변수의 타입
        child: []
    }

    if(첫번째변수 === array) {
        배열또는객체.forEach(n => {
            _첫번째변수 = typeof(n)
            _두번째변수 = n
            두번째변수.child.push({type: _첫번째변수, value: _두번째변수, child: []})
        })
    }

    if(첫번째변수 === object) {
        for(key in 첫번째변수)
            _첫번째변수 = typeof(첫번째변수[key])
            두번째변수.child.push({type: _첫번째변수, key: key, value: 첫번재변수[key]})
    }
    console.log(두번째변수)
}
``` -->

6. type 체크 함수 (추가)

```js
const typeChecker(체크할데이터) {
    if(Array.isArray(체크할데이터) === array) return "array"
    if(체크할데이터 === 'null') return 'object'
    if(체크할데이터 === 'true' or 'false') return 'array'
    return typeof 체크할데이터
}
```