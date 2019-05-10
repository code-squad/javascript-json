    class ArrayParser {
        constructor() {
            this.stacks = {
                arrayBracketStack : [],
                keyStack : [],
                objectBracketStack : [],
                parentTypeStack : []
            };

            this.operators = {
                "," : "separator",
                "[" : "arrayStartOperator",
                "]" : "arrayEndOperator",
                "{" : "objectStartOperator",
                "}" : "objectEndOperator",
                ":" : "colone"
            };

        }

        checkOperator(charactor){
            let result = false;
            for(let i in this.operators){
                if(i === charactor){
                    result = true;
                }
            }
            return result;
        }

        tokenizer(inputString) {
            const tokenArray = [];
            let value = "";
            for (let i = 0; i < inputString.length; i++) {
                if (this.checkOperator(inputString[i])) {
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
            if(this.checkOperator(string)){
                return this.operators[string];
            }
            if (string === "true" || string === "false") return "boolean";
            if (string[0] === "'" && string[string.length - 1] === "'" || string[0] === '"' && string[string.length - 1] === '"') return "string";
            if (string === "null") return "null";
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

        makeDataObject(inputData,inputArray){
            const resultObject = {}
            if(inputData.type === "arrayStartOperator"){
                resultObject.type = "array";
                resultObject.child = this.parser(inputArray);
            }else if(inputData.type === "objectStartOperator"){
                resultObject.type = "object";
                resultObject.child = this.parser(inputArray);
            }else{
                resultObject.type = inputData.type;
                resultObject.value = inputData.value;
            }
            return resultObject;
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
                        resultObject[this.stacks.keyStack.pop()] = this.makeDataObject(inputData,inputArray);
                    } else {
                        this.stacks.parentTypeStack.push("array");
                        resultArray.push(this.makeDataObject(inputData,inputArray));
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
                    this.stacks.objectBracketStack.push("{");
                    if (this.getParentType() === "array") {
                        this.stacks.parentTypeStack.push("object");
                        resultArray.push(this.makeDataObject(inputData,inputArray));
                    } else {
                        this.stacks.parentTypeStack.push("object");
                        if (this.stacks.keyStack.length === 0) {
                            Object.assign(resultObject,this.makeDataObject(inputData,inputArray));
                        } else {
                            resultObject[this.stacks.keyStack.pop()] = this.makeDataObject(inputData,inputArray);
                        }
                    }
                } else if (inputData.type === 'separator' || inputData.type === "colone") {
                    continue;
                } else {
                    if (this.getParentType() === "object") {
                        if (this.stacks.keyStack.length === 0) {
                            this.stacks.keyStack.push(inputData.value);
                        } else {
                            resultObject[this.stacks.keyStack.pop()] = this.makeDataObject(inputData,inputArray);
                        }
                    } else {
                        resultArray.push(this.makeDataObject(inputData,inputArray));
                    }
                }
            }
            return resultArray[0] === undefined ? resultObject : resultArray[0]
        }

        parserExcuter(inputString) {
            try {
                this.inputIndex = 0;
                let result = this.parser(this.lexer(this.tokenizer(inputString)));
                result = this.stacks.arrayBracketStack.length !== 0 ? "유효하지 않은 텍스트" : result;
                return result;
            } catch (error) {
                console.log(error.message);
            }
        }
    }


    const arrParser = new ArrayParser();
    const testCode = (input) => arrParser.parserExcuter(input);

    const string = [];
    string[0] = '{"type":"array","child":[{"type":"number","value":22},{"type":"object","child":{"abc":{"type":"number","value":12}}},{"type":"number","value":33}]}';
    string[1] ='{"type":"array","child":[{"type":"number","value":22},{"type":"object","child":{"ab":{"type":"object","child":{"abab":{"type":"number","value":1}}}}},{"type":"number","value":33}]}';
    string[2] ='{"type":"array","child":[{"type":"object","child":{"ab":{"type":"object","child":{"abab":{"type":"number","value":1}}}}},{"type":"number","value":33}]}';
    string[3] = '{"type":"array","child":[{"type":"object","child":{"ab":{"type":"array","child":[{"type":"number","value":1},{"type":"number","value":2},{"type":"number","value":3}]}}},{"type":"number","value":33}]}';
    string[4] = '{"type":"object","child":{"ab":{"type":"array","child":[{"type":"number","value":1},{"type":"number","value":2},{"type":"number","value":3}]}}}';

    console.log(string[0] === JSON.stringify(testCode("[22,{'abc':12},33]")));
    console.log(string[1] ===JSON.stringify(testCode("[22,{'ab' :  {'abab' : 1}},33]")));
    console.log(string[2] ===JSON.stringify(testCode("[{'ab' : {'abab' : 1}},33]")));
    console.log(string[3] ===JSON.stringify(testCode("[{'ab' : [1,2,3]},33]")));
    console.log(string[4] ===JSON.stringify(testCode("{'ab' : [1,2,3]}")));

    // console.dir(testCode("[22,{'abc':12},33]"));
    // console.dir(testCode("[22,{'ab' :  {'abab' : 1}},33]"));
    // console.dir(testCode("[{'ab' : {'abab' : 1}},33]"));
    // console.dir(testCode("[{'ab' : [1,2,3]},33]"));
    // console.dir(testCode("{'ab' : [1,2,3]}"));
    // console.log(testCode("['1a3',[22,23,[11,[112233],112],55],33]"));
    // console.log(testCode("['1'a3',[22,23,[11,[112233],112],55],33]"));