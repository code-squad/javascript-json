const str = "[123, 22, 33]";

const tokenizer = function(str) {
    const resultArr = [];
    let stack = [];
    let strArr = str.split('');
    strArr.forEach((letter)=>{
        if (letter !== '[') {
            if (letter === ',' || letter === ']') {
                token = stack.join('').trim();
                resultArr.push(token);
                stack = [];
            }else stack.push(letter);
        }
    });
    return resultArr
};

const ArrayParser = function(str) {
    const result = tokenizer(str);
    return result
};

const result = ArrayParser(str);
console.log(result);
// console.log(JSON.stringify(result, null, 2)); 

// { type: 'array',
//   child: 
//    [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] } 
//     ] 
// }