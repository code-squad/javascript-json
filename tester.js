// import arrayParser.js through Node.js
const main = require('./arrayParser');



const str = "[488, [2573, [48, [1577, 1577]], 369], 13, [1,2,3]]";
const result = main.arrayParser(str);
console.log(JSON.stringify(result, null, 4));

// Output
// {
//     "type": "array",
//     "child": [
//         {
//             "type": "number",
//             "value": 488
//         },
//         {
//             "type": "array",
//             "child": [
//                 {
//                     "type": "number",
//                     "value": 2573
//                 },
//                 {
//                     "type": "array",
//                     "child": [
//                         {
//                             "type": "number",
//                             "value": 48
//                         },
//                         {
//                             "type": "array",
//                             "child": [
//                                 {
//                                     "type": "number",
//                                     "value": 1577
//                                 },
//                                 {
//                                     "type": "number",
//                                     "value": 1577
//                                 }
//                             ],
//                             "value": "arrayObject"
//                         }
//                     ],
//                     "value": "arrayObject"
//                 },
//                 {
//                     "type": "number",
//                     "value": 369
//                 }
//             ],
//             "value": "arrayObject"
//         },
//         {
//             "type": "number",
//             "value": 13
//         },
//         {
//             "type": "array",
//             "child": [
//                 {
//                     "type": "number",
//                     "value": 1
//                 },
//                 {
//                     "type": "number",
//                     "value": 2
//                 },
//                 {
//                     "type": "number",
//                     "value": 3
//                 }
//             ],
//             "value": "arrayObject"
//         }
//     ]
// }