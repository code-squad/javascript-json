class ArrayParser {
    constructor() {
        this.bracketStack = [];
    }
    tokenizer(inputString) {
        const tokenArray = [];
        for (let i in inputString) {
            if (inputString[i] !== ' ' && inputString[i] !== "\n") {
                tokenArray.push(inputString[i]);
            }
        }
        return tokenArray;
    }

    typeCheck(string) {
        if (string === "true" || string === "false") return "boolean";
        if (string[0] === "'" && string[string.length - 1] === "'")return "string";
        if (string === ",") return "separator";
        if (string === "[" || string === "]") return "arrayOperator";
        return "number";
    }

    lexer(inputArray) {
        const lexerArray = [];
        inputArray.reduce((acc, value) => {
            if (value === "[" || value === "]" || value === ",") {
                if (acc !== "") {
                    lexerArray.push({"value" : acc, "type" : this.typeCheck(acc)});
                    lexerArray.push({"value" : value, "type" : this.typeCheck(value)});
                    acc = "";
                } else {
                    lexerArray.push({"value" : value, "type" : this.typeCheck(value)});
                }
            } else {
                acc += value;
            }
            return acc
        }, "");
        return lexerArray;
    }

    parser(inputArray, inputIndex = 0, resultArray) {
        
        // [ 만나면 스택에 추가
        // 배열 생성
        // ] 만나면 배열 닫기
        // 숫자 만나면 배열에 추가
        // 쉼표만나면 인덱스 넘기기
        parser(inputArray, inputIndex, resultArray);
        return resultArray
    }

    parserExcuter(inputString) {
        const result = this.parser(this.lexer(this.tokenizer(inputString)));
        this.bracketStack.length !== 0 ? result = false : 0;
        return result;
    }
}


const arrParser = new ArrayParser();
const testCode = (input) => {
    // return arrParser.tokenizer(input);
    return arrParser.lexer(input);
}

// console.log(testCode('[123,12,1]'));
console.log(testCode(['[', '1', '2', '3', ',', '1', '2', ',', '1', ']']));