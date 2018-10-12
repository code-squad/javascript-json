/*
ArrayParser함수를 만든다.
배열안에는 숫자데이터만 존재한다.
배열형태의 문자열을 token단위로 해석한 후, 이를 분석한 자료구조를 만든다.
정규표현식 사용은 최소한으로 한다.(token의 타입체크에 한해 사용가능)

var str = "[123, 22, 33]";
var result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));   //보기좋게 출력할수도 있음.

{ type: 'array',
  child: 
   [ { type: 'number', value: '123', child: [] },
     { type: 'number', value: '22', child: [] },
     { type: 'number', value: '33', child: [] } 
    ] 
}

처음에는, 이런 식으로 동작하는 것부터 구현해보자.
var str = "[1,2]"; // 문자열 str을 한글자씩 탐색하면서 '[' , ']' 를 출력해보기 (반복문을 사용한다) // 또는 숫자형태의 문자만(1,2) 출력해보기
이런 과정을 하는 것을 토큰나이저(tokenizer)라고 한다. 하나의 작은 실행단위를 토큰이라고하고, 문자열에서 토큰을 추출해나가는 것이다.
*/

// 데이터 타입에 따라 생성되는 class
class DataStructure {
    constructor(type, value) {
        if (type === 'number') {
            this.type = type;
            this.value = value;
            this.child = [];
        } else if (type === 'array') {
            this.type = type;
            this.child = [];
        }
    }
}


const arrayParser = function (str) {
    // if str = '[]'
    let index = 0;

    if (str[index] === '[') {
        index++;
        if (str[index] === ']') {
            return new DataStructure('array');
        }
    }
}

