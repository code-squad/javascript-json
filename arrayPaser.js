function ParseData ( type ) {
    this.type = type;
    this.child = [];
    }



function getDataType (input) {
    if (input[0] === '[') {
        parseData.type = 'array'
        return ArrayParser(input);
    }   else if (inputType === '{') {
        parseData.type = 'object'
        return tokenizeObjData(input);
    }
}


function ArrayParser (input) {
    const tempData = input.substring(1, input.length-1).split(',');
    let token = tempData.map(function(v) {
        return parseInt(v)
    })
    token.forEach(function(v) {
        parseData.child.push({type :typeof v, value : v, child : []})
    })
    console.log(JSON.stringify(parseData, null, 2))
}

const str = "[123, 22, 33]";
const parseData = new ParseData (str);
const result = getDataType(str);
console.log(JSON.stringify(result, null, 2)); 

// const str = "[123, 22, 33]";

// const result = new ArrayParser(str);
// console.log(JSON.stringify(result, null, 2)); 
// result  결과값
// { type: 'array',
//   child: 
//    [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] } 
//     ] 
// }







