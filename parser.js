
class ArrayParser {
    constructor(){
        this.bracketStack = [];
    }
    tokenizer(inputString){
        // 스트링을 배열에 하나씩 넣기
        // 공백은 제외
        return array
    }

    lexer(inputArray){
        //리터럴은 리터럴끼리, operator, seperate 끼리 묶어서 한 index에 넣기
        //객체로 type, value 나눠서 넣기
        return array
    }

    parser(inputArray, inputIndex = 0, resultArray){
        // [ 만나면 스택에 추가
        // 배열 생성
        // ] 만나면 배열 닫기
        // 숫자 만나면 배열에 추가
        // 쉼표만나면 인덱스 넘기기
        parser(inputArray,inputIndex,resultArray);
        return resultArray
    }

    parserExcuter(inputString){
        const result = this.parser(this.lexer(this.tokenizer(inputString)));
        this.bracketStack.length !== 0 ? result = false : 0;
        return result;
    }    
}
