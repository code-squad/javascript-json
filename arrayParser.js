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
            // console.log(stack)
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
}
