class ParsingForm {
    constructor(input) {
        this.type = typeof input;
        this.value = input;
        this.child = [];
    }
} 

class ArrayParser {
    constructor(input) {
        this.rawData = input;
    }

    tokenizing() {
        //문자열 분리 (좀 더 엄격한 파싱 방법 생각해보기)
        let token = this.rawData.match(/\w+/g);
        
        return token;
    }

    lexing(token) {
        // 데이터의 타입 체크
        let wrapType;
        if(Array.isArray(token)) {
            wrapType = 'Array';
        } else {
            wrapType = 'Object';
        }

        let lexedData = [];
        token.forEach(function(v) {
            if(typeof parseInt(v) === 'number') {
                lexedData.push(parseInt(v));
            }
        });

        return [wrapType, lexedData]
    }

    // main 메서드임 
    parsing(lexedData) {
        let [wrapType, innerData] = lexedData;
        let parsedData = {
            type: `${wrapType}`,
            child: []
        }
        
        innerData.forEach(function(v) {
            parsedData.child.push(new ParsingForm(v));
        }) 
        return parsedData;
    }

    MainParser() {
        let token = this.tokenizing();
        let lexedData = this.lexing(token);
        let parsedData = this.parsing(lexedData);

        return parsedData;
    }
}

const str = "[123, 22, 33]";
const arrayParser = new ArrayParser(str);
const result = arrayParser.MainParser();
console.log(JSON.stringify(result, null, 2)); 