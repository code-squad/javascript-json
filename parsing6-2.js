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

// main class
class Parser {
    runParser(rawData) {
        let tokenizing = new Tokenizing();
        let token = tokenizing.runTokenizer(rawData);
;
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