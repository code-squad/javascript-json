// arrayParser step2(2중 중첩 배열 분석)

const arrayParser = {

    // 분석된 문자열 데이터(줄기)
    stem: [],

    // 배열의 깊이(0부터 시작)
    depth: 0, 

    // 메인 메소드(문자열 데이터 분석 시작)
    getAnalyzedStem(targetStr) {
        this.stem[this.depth] = {};
        this.stem[this.depth].child = []; 
        targetStr = this.checkDataType(targetStr);
        this.disassembleStr(targetStr);
        return this.stem;
    },

    // 문자열의 데이터 타입 체크 메소드
    checkDataType(targetStr) {
        if (targetStr[0] === '[' && targetStr[targetStr.length - 1] === ']') {
            this.stem[this.depth].type = 'array';
            this.stem[this.depth].value = 'ArrayObject';
            this.stem[this.depth].depth = this.depth; 
            targetStr = targetStr.replace('[', "");
        }
        return targetStr;
    },

    // 문자열 해체 메소드
    disassembleStr(targetStr) {
        let extractedNum = "";
        for (let ele of targetStr) {
            if (ele === "[") { // 중첩 배열을 만나면 depth가 1씩 증가
                this.depth++;
                this.stem[this.depth] = {};
                this.stem[this.depth].child = [];
                targetStr = this.checkDataType(targetStr);
                
            } else if (!isNaN(Number(ele))) { // 숫자형식의 문자열을 인식하여 추출
                extractedNum += ele;
                targetStr = targetStr.replace(ele, "");

            } else if (ele === "," && extractedNum !== "") { // 분석할 문자열을 추출한 경우 ','를 만나면 분석 메소드 호출
                this.analyzeStr(extractedNum);
                targetStr = targetStr.replace(ele, "")
                extractedNum = "";

            } else if (ele === "," && extractedNum === "") { // 분석할 문자열이 없는 경우 : ex( ,[ )
                targetStr = targetStr.replace(ele, "");

            } else if (ele === "]" && extractedNum !== "") { // 분석할 문자열을 추출한 경우 ']'를 만나면 분석 메소드 호출
                this.analyzeStr(extractedNum);
                targetStr = targetStr.replace(ele, "")
                extractedNum = "";
                this.depth--;

            } else if (ele === "]" && extractedNum === "") { // 분석할 문자열이 없는 경우 : ex( ]] )
                targetStr = targetStr.replace(ele, "");
                this.depth--;
            }
        }
        return this.printArrayStem(this.stem); // 분석 결과 출력 메소드
    },

    // 추출 문자열 분석 메소드
    analyzeStr(extractedNum) {
        const childObj = {};
        childObj.type = typeof Number(extractedNum);
        childObj.value = extractedNum;
        childObj.depth = this.depth; 
        childObj.child = [];
        this.stem[this.depth].child.push(childObj); 
    },

    // 분석 결과 출력 메소드
    printArrayStem(stem) {
        for(let i = stem.length-1; i > 0; i--) {
            stem[i-1].child.push(stem[i]); 
        }
        return stem;
    }

} // end arrayParser 

// 분석 대상 문자열 데이터
let targetStr = '[123,[22,23,[11,[112233],112],55],33]]';
//let targetStr = '[10,[20,[30,[40,[50,[60,[70,[80,[90,[100]]]]]]]]]]';

let analyzedStem = arrayParser.getAnalyzedStem(targetStr)[0];
console.log(JSON.stringify(analyzedStem, null, 2));