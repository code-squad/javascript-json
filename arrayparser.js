// 예시
// const str = "[123, 22, 33]";
// const result = ArrayParser(str); //str을 토큰 단위로 구분한 형태(객체로 만들면 좋을 듯)
// console.log(JSON.stringify(result, null, 2)); //토큰 단위로 구분된 것을 분석하는 것

// //result는 해당 배열을 분석한 형태이다.
// //예를들어, 다음과 같은 결과일 수 있다. (꼭 아래 형태일 필요 없음)

// { type: 'array',
//   child:
//    [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] }
//     ]
// }

const Token = require("./token.js/index.js");

const str = "[123, 22, 33]".replace(/\s/g, "");
const first = str[0];

if (first === "[") {
  const token = new Token("Array", "", [], 1);
  parser(str, token);
}

function parser(str, token) {
  while (token.cnt !== 0) {
    word = "";
    for (let i = 1; i < str.length; i++) {
      if (str[i] === ",") {
        token.child.push(new Token(typeof Number(word), word, [], 0));
        word = "";
      } else if (str[i] === "]") {
        token.child.push(new Token(typeof Number(word), word, [], 0));
        token.cnt -= 1;
      } else if (str[i] === "[") {
        const token = new Token("Array", "", [], 0);
        // token.cnt += 1;
        // str = str[i+1]
        return parser(str, token);
      } else {
        word += str[i];
      }
    }
  }
  console.log(token);
}
