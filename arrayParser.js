class ArrayParser {
    constructor() {
    }
    tokenizer(str) {
        const splitedStr = str.split(', ')
        .reduce((acc, cur) => {
            isNaN(Number(cur)) !== 'number' ? acc.push(...cur.match(/\[|\]|\d+/g)) : acc.push(cur)
            return acc
        }, []);
        this.tokenizedData = splitedStr.slice(1,splitedStr.length - 1)
        
    }
}
