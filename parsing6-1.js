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
        //문자열 분리
        let token = this.rawData.match(/\w+/g);
        return token;
    }

    lexing() {
        // 데이터의 타입 체크
        let token = this.tokenizing();

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

    parsing() {
        let [wrapType, lexedData] = this.lexing();
        let parsedData = {
            type: `${wrapType}`,
            child: []
        }
        lexedData.forEach(function(v) {
            parsedData.child.push(new ParsingForm(v));
        }) 
        return parsedData;
    }
}

const str = "[123, 22, 33]";
const arrayParser = new ArrayParser(str);
const result = arrayParser.parsing();
console.log(JSON.stringify(result, null, 2)); 
