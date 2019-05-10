    class ArrayParser {
        constructor() {
            this.stacks = {
                arrayBracketStack : [],
                keyStack : [],
                objectBracketStack : [],
                parentTypeStack : []
            }
        }
        tokenizer(inputString) {
            const tokenArray = [];
            let value = "";
            for (let i = 0; i < inputString.length; i++) {
                if (inputString[i] === "[" || inputString[i] === "]" || inputString[i] === "," || inputString[i] === "{" || inputString[i] === "}" || inputString[i] === ":") {
                    if (value !== "") {
                        tokenArray.push(value);
                        tokenArray.push(inputString[i]);
                        value = "";
                    } else {
                        tokenArray.push(inputString[i]);
                    }
                } else {
                    if (inputString[i] !== " " || value !== "") {
                        value += inputString[i];
                    }
                }
            }
            return this.removeBlank(tokenArray);
        }

        removeBlank(stringArray) {
            stringArray.forEach((element, index) => {
                stringArray[index] = element.trim();
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
            if (string === "{") return "objectStartOperator";
            if (string === "}") return "objectEndOperator";
            if (string === ":") return "colone";
            return "number";
        }

        validationCheck(element, type) {
            if (type === "number") {
                if (isNaN(element)) throw new Error(`${element}는 알수 없는 타입입니다.`);
            }
            if (type === "string") {
                if (this.removeQuotes(element).includes("'") || this.removeQuotes(element).includes('"')) throw new Error(`${element}는 올바른 문자열이 아닙니다.`);
            }
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

        getParentType(){
            return this.stacks.parentTypeStack[this.stacks.parentTypeStack.length-1];
        }

        parser(inputArray) {
            const resultArray = [];
            const resultObject = {};
            let inputData;
            while (inputArray.length > 0) {
                inputData = inputArray.shift();
                if (inputData.type === "arrayStartOperator") {
                    this.stacks.arrayBracketStack.push("[");
                    if (this.getParentType() === "object") {
                        this.stacks.parentTypeStack.push("array");
                        resultObject[this.stacks.keyStack.pop()] = {
                            type: "array",
                            child: this.parser(inputArray)
                        }
                    } else {
                        this.stacks.parentTypeStack.push("array");
                        resultArray.push({
                            type: "array",
                            child: this.parser(inputArray)
                        });
                    }
                } else if (inputData.type === "arrayEndOperator") {
                    this.stacks.arrayBracketStack.pop();
                    this.stacks.parentTypeStack.pop();
                    return resultArray;
                } else if (inputData.type === "objectEndOperator") {
                    this.stacks.objectBracketStack.pop();
                    this.stacks.parentTypeStack.pop();
                    return resultObject;
                } else if (inputData.type === "objectStartOperator") {
                    if (this.getParentType() === "array") {
                        this.stacks.parentTypeStack.push("object");
                        this.stacks.objectBracketStack.push("{");
                        resultArray.push({
                            type: "object",
                            child: this.parser(inputArray)
                        });
                    } else {
                        this.stacks.parentTypeStack.push("object");
                        this.stacks.objectBracketStack.push("{");
                        if (this.stacks.keyStack.length === 0) {
                            resultObject.type = "object";
                            resultObject.child = this.parser(inputArray);
                        } else {
                            resultObject[this.stacks.keyStack.pop()] = {
                                type: "object",
                                child: this.parser(inputArray)
                            }
                        }
                    }
                } else if (inputData.type === 'separator' || inputData.type === "colone") {
                    continue;
                } else {
                    if (this.getParentType() === "object") {
                        if (this.stacks.keyStack.length === 0) {
                            this.stacks.keyStack.push(inputData.value);
                        } else {
                            resultObject[this.stacks.keyStack.pop()] = {
                                type: inputData.type,
                                value: inputData.valuea
                            }
                        }
                    } else {
                        resultArray.push({
                            type: inputData.type,
                            value: inputData.value
                        });
                    }
                }
            }
            return resultArray[0] === undefined ? resultObject : resultArray[0]
        }

        parserExcuter(inputString) {
            try {
                this.inputIndex = 0;
                let result = this.parser(this.lexer(this.tokenizer(inputString)));
                // result = this.bracketStack.length !== 0 ? "유효하지 않은 텍스트" : result;
                return result;
            } catch (error) {
                console.log(error.message);
            }
        }
    }


    const arrParser = new ArrayParser();
    const testCode = (input) => {
        // return arrParser.lexer(arrParser.tokenizer(input));
        return arrParser.parserExcuter(input);
    }

    console.dir(testCode("[22,{'abc':12},33]"));
    console.dir(testCode("[22,{'ab' :  {'abab' : 1}},33]"));
    console.dir(testCode("[{'ab' : {'abab' : 1}},33]"));
    console.dir(testCode("[{'ab' : [1,2,3]},33]"));
    console.dir(testCode("{'ab' : [1,2,3]}"));
    // console.log(testCode("['1a3',[22,23,[11,[112233],112],55],33]"));
    // console.log(testCode("['1'a3',[22,23,[11,[112233],112],55],33]"));