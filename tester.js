// import arrayParser.js through Node.js
const main = require('./arrayParser');



const str = "[488, 2573, 13]";
const result = main.arrayParser(str);
console.log(JSON.stringify(result, null, 2));

// 실행결과
// {
//     "type": "array",
//     "child": [
//       {
//         "type": "number",
//         "child": [],
//         "value": 488
//       },
//       {
//         "type": "number",
//         "child": [],
//         "value": 2573
//       },
//       {
//         "type": "number",
//         "child": [],
//         "value": 13
//       }
//     ]
//   }
