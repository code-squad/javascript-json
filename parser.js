class ArrayParser {
    constructor() {
        this.bracketStack = [];
        this.inputIndex = 0;
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
        if (string[0] === "'" && string[string.length - 1] === "'") return "string";
        if (string === ",") return "separator";
        if (string === "[") return "arrayStartOperator"
        if (string === "]") return "arrayEndOperator";
        return "number";
    }
    
    lexer(inputArray) {
        const lexerArray = [];
        inputArray.reduce((acc, value) => {
            if (value === "[" || value === "]" || value === ",") {
                if (acc !== "") {
                    lexerArray.push({
                        "value": acc,
                        "type": this.typeCheck(acc)
                    });
                    lexerArray.push({
                        "value": value,
                        "type": this.typeCheck(value)
                    });
                    acc = "";
                } else {
                    lexerArray.push({
                        "value": value,
                        "type": this.typeCheck(value)
                    });
                }
            } else {
                acc += value;
            }
            return acc
        }, "");
        return this.makeTree(lexerArray);
    }
                                        
    makeTree(inputArray ,resultArray = []) {
        let inputData;
        while(inputArray.length > 0){
            inputData = inputArray.shift();
            if(inputData.type === "arrayStartOperator" ){
                resultArray.push({type : "array", child : this.makeTree(inputArray, [])});
            }else if(inputData.type === 'number'){
                resultArray.push({type : 'number', value : inputData.value});
            }else if(inputData.type === "arrayEndOperator" ) {
                return resultArray;
            }
        }

        return resultArray;
    }
    
    
    
        parser(inputArray, result = {}) {
        // if(inputArray[this.inputIndex++].value === "]"){
        //     this.bracketStack.pop();
        //     return result;
        // }
        if(this.inputIndex > inputArray.length-1){
            return;
        }

        if(inputArray[this.inputIndex].value === "["){
            if(this.inputIndex === 0){
                result.type = "array";
                result.child = [];
                this.bracketStack.push("[");
                this.inputIndex++;
                result.child = this.parser(inputArray, result.child);
            }else{
                result.push({"type" : "array", "child" : []});
                this.bracketStack.push("[");
                this.inputIndex++;
                result[result.length-1].child = this.parser(inputArray, result[result.length-1].child);
            }


        } else if(inputArray[this.inputIndex].value === "]"){
            this.bracketStack.pop();
            this.inputIndex++;
            return result = this.parser(inputArray,result);

        }else if(inputArray[this.inputIndex].value === ","){
            this.inputIndex++;
            this.parser(inputArray,result);
        }else{
            result.push(inputArray[this.inputIndex++]);
            this.parser(inputArray, result);
        }

            // return result;
        // [ 만나면 스택에 추가
        // 배열 생성
        // ] 만나면 배열 닫기
        // 숫자 만나면 배열에 추가
        // 쉼표만나면 인덱스 넘기기
        // parser(inputArray, inputIndex, result);
        // return resultArray
    }

    parserExcuter(inputString) {
        this.inputIndex = 0;
        let result = this.parser(this.lexer(this.tokenizer(inputString)));
        this.bracketStack.length !== 0 ? result = false : 0;
        return result;
    }
}


const arrParser = new ArrayParser();
const testCode = (input) => {
    // return arrParser.tokenizer(input);
    return arrParser.lexer(input);
    // return arrParser.parserExcuter(input);
}

// console.log(testCode('[123,12,[3],1]'));
console.log(testCode(['[', '1', '2', '3', ',', '1', '2', ',', '[', '3', ']', ',', '1', ']' ])[0].child);
// console.log(testCode([ { value: '[', type: 'arrayOperator' },
// { value: '123', type: 'number' },
// { value: ',', type: 'separator' },
// { value: '12', type: 'number' },
// { value: ',', type: 'separator' },
// { value: '1', type: 'number' },
// { value: ']', type: 'arrayOperator' } ]));