class ArrayParser {
    constructor() {
        this.bracketStack = [];
    }
    tokenizer(inputString) {
        const tokenArray = [];
        let value = "";
        for (let i = 0; i < inputString.length; i++) {
            if (inputString[i] === "[" || inputString[i] === "]" || inputString[i] === ",") {
                if (value !== "") {
                    tokenArray.push(value);
                    tokenArray.push(inputString[i]);
                    value = "";
                } else {
                    tokenArray.push(inputString[i]);
                }
            } else {
                value += inputString[i];
            }
        }
        return this.removeBlank(tokenArray);
    }

    removeBlank(stringArray) {
        stringArray.forEach((element, index) => {
            stringArray[index] = element.trimStart().trimEnd();
        });
        return stringArray;
    }

    typeCheck(string) {
        if (string === "true" || string === "false") return "boolean";
        if (string[0] === "'" && string[string.length - 1] === "'" || string[0] === '"' && string[string.length - 1] === '"') return "string";
        if (string === "null") return "null";
        if (string === ",") return "separator";
        if (string === "[") return "arrayStartOperator"
        if (string === "]") return "arrayEndOperator";
        return "number";
    }

    validationCheck(element, type) {
        if (type === "number") {
            if (isNaN(Number(element))) throw new Error(`${element}는 알수 없는 타입입니다.`);
            return type;
        }
        if (type === "string") {
            if (this.removeQuotes(element).includes("'")) throw new Error(`${element}는 올바른 문자열이 아닙니다.`);
            return type;
        }
        return type;
    }

    getDataObject(element) {
        const resultObject = {};
        resultObject.type = this.typeCheck(element);
        this.validationCheck(element, resultObject.type);
        if (resultObject.type === "boolean") {
            resultObject.value = Boolean(element === "true");
        } else if (resultObject.type === "number") {
            resultObject.value = Number(element);
        } else if (resultObject.type === "null") {
            resultObject.value = null;
        } else if (resultObject.type === "string") {
            resultObject.value = String(this.removeQuotes(element));
        }
        return resultObject;
    }

    removeQuotes(string) {
        return string.slice(1, string.length - 1);
    }

    lexer(inputArray) {
        const lexerArray = [];
        inputArray.forEach(element => {
            lexerArray.push(this.getDataObject(element));
        });
        return lexerArray;
    }

    parser(inputArray) {
        const resultArray = [];
        let inputData;
        while (inputArray.length > 0) {
            inputData = inputArray.shift();
            if (inputData.type === "arrayStartOperator") {
                this.bracketStack.push("[");
                resultArray.push({
                    type: "array",
                    child: this.parser(inputArray)
                });
            } else if (inputData.type === "arrayEndOperator") {
                this.bracketStack.pop();
                return resultArray;
            } else if (inputData.type === 'separator') {
                continue;
            } else {
                resultArray.push({
                    type: inputData.type,
                    value: inputData.value
                });
            }
        }

        return resultArray;
    }

    parserExcuter(inputString) {
        try {
            this.inputIndex = 0;
            let result = this.parser(this.lexer(this.tokenizer(inputString)))[0];
            result = this.bracketStack.length !== 0 ? "유효하지 않은 텍스트" : result;
            return result;
        } catch (error) {
            console.log(error.message);
        }
    }
}


const arrParser = new ArrayParser();
const testCode = (input) => {
    return arrParser.parserExcuter(input);
}

console.log(testCode("['1a3',[22,23,[11,[112233],112],55],33]"));
console.log(testCode("['1a3',[22,23,[11,[112233],112],55],3d3]"));
console.log(testCode("['1'a3',[22,23,[11,[112233],112],55],33]"));