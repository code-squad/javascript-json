// error check class
class ErrorCheck {
    // 문자열타입 체크
    stringCheck(data) {
        data = this.stringCheck_wrap(data);
        data = this.stringCheck_inner(data);
        
        return data;
    }

    stringCheck_wrap(data) {
        let length = data.length - 1;
        let firstWord = data[0]
        let lastWord = data[length];
        let answer;

        if(firstWord !== lastWord) {
            throw new Error(`${data}는 올바른 문자열이 아닙니다.`);

        } else {
            answer = data;
        }

        return data;
    }

    stringCheck_inner(input) {
        let answer;
        let length = input.length - 1;
        let data = input.slice(1, length).split("");
        data = data.filter(v => v === "'").length;

        if(data !== 0) {
            throw new Error(`${input}는 올바른 문자열이 아닙니다.`); 

        } else {
            answer = input;
        }

        return answer;
    }

    // 숫자타입 체크
    numberCheck(data) {
        let answer;

        if(Number(data) >= 0) {
            answer = data;

        } else {
            throw new Error(`${data}은(는) 알 수 없는 타입입니다.`); 
        }

        return answer;
    }
}

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
        //console.log(tokenizedData);
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
        let errorCheck = new ErrorCheck();
        
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
            value = errorCheck.stringCheck(data);

        } else {
            type = "Number";
            value = errorCheck.numberCheck(data);

        }

        return new LexingForm(type, value);
    }
    
    // 렉서 메인함수
    runLexer(token) {
        let lexedData = this.buildLexer(token);
        //console.log(lexedData);
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
try {
    const arrayParser = new Parser();
    const result = arrayParser.runParser(str1);
    console.log(JSON.stringify(result, null, 2));
} catch(e) {
    console.log(e);
}   
