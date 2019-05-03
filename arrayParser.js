class ArrayParser {
    constructor() {
    }

    tokenizer(str) {
        const splitedStr = str.split(', ')
        .reduce((acc, cur) => {
            acc.push(...cur.match(/\[|\]|\d+/g))
            return acc
        }, []);
        this.tokenizedData = splitedStr;
    }

    lexer(arr) {
        let pointer = -1;
        const stack = arr.reduce((acc, cur) => {
            if(cur === '[') {
                pointer++;
                acc.push([]);
            }else if (!isNaN(Number(cur))) {
                acc[pointer].push(cur);
            }else if(cur === ']' && pointer !== 0) {
                pointer--;
                acc[pointer].push(acc.pop());
            }
            return acc
        }, []);
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

const arrayParser = new ArrayParser();
// arrayParser.tokenizer("[123, 22, 33]")
// console.log(arrayParser.tokenizedData);
arrayParser.tokenizer("[123, [22, 44], [11, 22, [33, 44, 55], 66], 33]");
// console.log(arrayParser.tokenizedData);
// arrayParser.tokenizer("[[123, 22, 33], [1, 2, 3]]");
// console.log(arrayParser.tokenizedData);
arrayParser.lexer(arrayParser.tokenizedData);
console.log(arrayParser.lexedData);
console.log(arrayParser.parser(arrayParser.lexedData));
console.log(arrayParser.parser(arrayParser.lexedData).child[2].child[2]);