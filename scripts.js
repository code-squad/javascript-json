let str = "[1,[1,[1,[1,3,[1,[2,[3,[4,[5,[6,[7]]]]]]]]]], 22]";
let stack= [];
let endCount = -1;
let result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));   

function arrayParser(str) {
    let tokenArray = lexer(tokenize, str)
    let result = tokenArray.reduce(reducer, tokenArray[0])
    return result;
}
function reducer(acc, cur) {
    if (cur.type === 'number') {
        acc.child.push(cur);
        return acc;
    }
    if (cur.type === 'array') {
        stack.push(acc)
        endCount++;
        acc = cur;
        return acc;
    }
    if(cur === ']'&& endCount !== 0){
        stack[endCount].child.push(acc);
        acc = stack[endCount];
        endCount--;
        return acc;
    }
    return acc;
};
function tokenize(str) {
    let result = each(str, checkToken)
    return result;
};
function each(str, iter) {
    let result = [];
    let number;
    for (i = 0; i < str.length; i++) {
        number = iter(str, result, number)
    }
    return result;
}
function checkToken(str, result, number) {
    if (number === undefined) number = ''
    if (str[i] === ']' && str[i - 1] !== ']') result.push(number);
    if (str[i].match(/\[|\]/)) result.push(`${str[i]}`);
    if (str[i].match(/[^\[\],]/)) number += str[i];
    if (str[i] === ',') {
        if (str[i - 1] === ']') {
            number = '';
        } else {
            result.push(number);
            number = '';
        }
    };
    return number;
}
function lexer(fn, str) {
    let tokenArray = fn(str)
    let lexerResult = tokenArray.map(v => {
        if (v === '[') return { type: 'array', value: 'ArrayObject', child: [] };
        if (Number(v)) return { type: 'number', value: `${v}`, child: [] };
        return v;
    });
    return lexerResult;
};
