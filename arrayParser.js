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

const typeChecker = function(value){
    const typeOfNumbValue = typeof Number(value);
    if (typeOfNumbValue === 'number') return 'number'
    else if (typeOfNumbValue === 'NaN') return 'NaN'
};

const lexer = function(data){
    let contextData = { 
        type: typeChecker(data), 
        value: data, 
        child: []
    };
    return contextData
};

const ArrayParser = function(str) {
    const tokenArr = tokenizer(str);
    const result = {
        type: 'array',
        child:[]
    };
    tokenArr.forEach((token)=>{
        let childData = lexer(token);
        result.child.push(childData);
    });
    return result
};

const result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2)); 

// { type: 'array',
//   child: 
//    [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] } 
//     ] 
// }