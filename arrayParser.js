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
}