// token class
class Tokenizing {
    constructor() {
        this.token = [];
    }

    // 공백제거
    removeSpace(input) {
        input = input.replace(/\s/ig, "").split("");
        
        return input
    }

    // 순회하여 토큰 제작
    buildToken(input) {
        let token = this.token;
        let temp = "";
        input.forEach(function(v) {
            if(v === '[') {
                token.push(v);
            } else if(v === ']') {
                token.push(temp)
                temp = ']';
            } else if(v === ',') {
                token.push(temp)
                temp = '';
            } else {
                temp = temp + v;
            }
        })

        return token;
    }

    // 토큰 메인 함수
    runTokenizer(rawData) {
        let data = this.removeSpace(rawData);
        let tokenizedData = this.buildToken(data);
        console.log(tokenizedData);
        return tokenizedData;
    }
}

// lexer form class
class LexingForm {
    constructor(type, input) {
        this.type = type;
        this.value = input;
    }
} 

// lexer class
class Lexing {
    // 순회하여 렉싱
    buildLexer(input) {
        let data = [];

        for(let i=0; i<input.length; i++) {
            data.push(this.typeCheck(input[i]))
        }
        
        return data;
    }

    // 데이터 타입체크
    typeCheck(data) {
        let type;
        let value;
        
        if(data === "[") {
            type = "ArrayOpen";
            value = data;
        
        } else if(data === "]") {
            type = "ArrayClose";
            value = data;

        } else if(data === "null") {
            type = "Null";
            value = null;

        } else if(data === "true") {
            type = "true";
            value = true;

        } else if(data === "false") {
            type = "false";
            value = false;

        } else if(data[0] === "'") {
            type = "String";
            value = data;

        } else {
            type = "Number";
            value = Number(data);

        }

        return new LexingForm(type, value);
    }
    
    // 렉서 메인함수
    runLexer(token) {
        let lexedData = this.buildLexer(token);
        console.log(lexedData);
        return lexedData;
    }
}

// parsing form class
class ParsingForm {
    constructor(type, value) {
        this.type = type;

        if(type === 'Array') {
            this.child = [];

        } else {
            this.value = value;

        }
    }
}

// parser class
class Parsing {
    // 파싱 메인함수
    runParser(lexedData) {
        let parsedData;
        const stack = [];

        for(let i=0; i<lexedData.length; i++) {
            let target = lexedData[i];
            if(target['type'] === "ArrayOpen") {
                let parsingForm = new ParsingForm("Array");
                stack.push(parsingForm);

            } else if(target['type'] === "ArrayClose") {
                let complete = stack.pop();
                stack[stack.length -1]["child"].push(complete);

            } else {
                let parsingForm = new ParsingForm(target["type"], target["value"]);
                stack[stack.length -1]["child"].push(parsingForm);

            }
        }

        parsedData = stack[0];
        return parsedData;
    }
}

// main class
class Parser {
    runParser(rawData) {
        let tokenizing = new Tokenizing();
        let token = tokenizing.runTokenizer(rawData);

        let lexing = new Lexing();
        let lexedData = lexing.runLexer(token);

        let parsing = new Parsing();
        let parsedData = parsing.runParser(lexedData);

        return parsedData;        
    }
}

// test case
const str1 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const str2 = "['1a'3',[22,23,[11,[112233],112],55],33]"
const str3 = "['1a3',[22,23,[11,[112233],112],55],3d3]"

// run program
const arrayParser = new Parser();
const result = arrayParser.runParser(str1);
console.log(JSON.stringify(result, null, 2));