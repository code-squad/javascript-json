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
}

const arrayParser = new ArrayParser();


//testCase//
arrayParser.tokenizer("[123, 22, 33]")
console.log(arrayParser.tokenizedData);