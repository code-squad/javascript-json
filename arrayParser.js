class ArrayParser {
    constructor() {
    }
    tokenizer(str) {
        const splitedStr = str.split(', ')
        .reduce((acc, cur) => {
            isNaN(Number(cur)) !== 'number' ? acc.push(...cur.match(/\[|\]|\d+/g)) : acc.push(cur)
            return acc
        }, []);
        this.tokenizedData = splitedStr
        
    }

    lexer(arr) {
        const stack = [];
        let pointer = -1;
        arr.forEach((val) => {
            if(val === '[') {
                pointer++;
                stack.push([]);
            }else if (!isNaN(Number(val))) {
                stack[pointer].push(val);
            }else if(val === ']' && pointer !== 0) {
                pointer--;
                stack[pointer].push(stack.pop());
            }
        });
        this.lexedData = stack[0];
    }

    parser(arr) {
        const resultObj = {
            type: 'array',
            child: []
        }
        arr.forEach((val) => {
            if (typeof val === 'string') {
                const obj = {
                    type : 'number',
                    value : val,
                    child : []
                }
                resultObj.child.push(obj);
            } else if (Array.isArray(val)) {
                resultObj.child.push(this.parser(val));
            }
        });
        return resultObj;
    }
}

const parser = new ArrayParser();
// parser.tokenizer("[123, 22, 33]")
// console.log(parser.tokenizedData);
parser.tokenizer("[123, [22, 44], [11, 22, [33, 44, 55], 66], 33]");
// console.log(parser.tokenizedData);
// parser.tokenizer("[[123, 22, 33], [1, 2, 3]]");
// console.log(parser.tokenizedData);
parser.lexer(parser.tokenizedData);
console.log(parser.lexedData);
console.log(parser.parser(parser.lexedData));
console.log(parser.parser(parser.lexedData).child[2].child[2]);