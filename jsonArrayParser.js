// arrayParser step6(오류 상황 탐지) commit 3

const ArrayParser = class {
    constructor() {
        this.accumulatedObjStack = [];
    }

    // 문자열 분리
    operateArrayParser(targetStr) {
        let rootBranch = {}; // 최종 분석결과
        if (this.checkIsClosedBrace(targetStr)) return false; // 괄호 체크하고.
        this.initializeBeforeSeparate(); // 설정 초기화하고. 
        rootBranch = this.separateEachString(targetStr, rootBranch); // 각각의 문자를 분려해서 처리하고 
        return rootBranch;
    }

    // 분석 전 설정 초기화
    initializeBeforeSeparate() {
        this.markStatus = { comma: "unmarked", brace: "closed" };
        this.extractedString = "";
        this.token = ""; // 분석 단위
        this.key = "";
    }

    // 각 문자열 처리
    separateEachString(targetStr, rootBranch) {
        for (let ch of targetStr) {
            if (this.token === "" && this.extractedString === "" && (ch === "[" || ch === "{")) {
                rootBranch = this.checkBrace(rootBranch, ch); // 새로운 브랜치(괄호) 생성
                continue;
            }
            else if (this.skipCharacter(this.extractedString, ch)) continue;
            else if (this.generateToken(this.extractedString, ch)) continue;
            else if (this.reduceDepth(this.extractedString, ch)) continue;
            else if (this.parseStringByType(this.extractedString, ch)) continue;
            else if (this.identifyKey(this.extractedString, ch)) continue;
            else if (this.checkIsMissingExp(this.token)) return false;
            else this.extractedString += ch;
        }
        return rootBranch;
    }

    // 정상적으로 닫히지 않은 괄호 탐지
    checkIsClosedBrace(targetStr) {
        const checkErrorStack = [];
        const map = { "[": "]", "{": "}" };
        for (let ch of targetStr) {
            if (ch === "[" || ch === "{") checkErrorStack.push(map[ch]);
            if (ch === "]" || ch === "}") {
                if (ch === checkErrorStack[checkErrorStack.length - 1])
                    checkErrorStack.pop();
                else break;
            }
        }
        if (checkErrorStack.length === 0) return false;
        if (this.printNotClosedMsg(checkErrorStack)) return true;
    }

    // 비정상인 괄호 탐지 시 에러 메시지 출력
    printNotClosedMsg(checkErrorStack) {
        const lastIndexValue = checkErrorStack[checkErrorStack.length - 1];
        switch (lastIndexValue) {
            case "]":
                console.log(`정상적으로 닫히지 않은 배열(']')이 있습니다.`);
                break;
            case "}":
                console.log(`정상적으로 닫히지 않은 객체('}')가 있습니다.`);
                break;
        }
        return true;
    }

    // 괄호 체크, 브랜치 생성(중괄호, 대괄호를 만날 때 마다 호출)
    checkBrace(rootBranch, ch) {
        if (!rootBranch.hasOwnProperty("child"))
            return this.generateRootBranch(rootBranch, ch);
        else {
            if (this.markStatus.brace === "closed" && this.markStatus.comma === "unmarked") return true;
            return this.generateLowerBranch(rootBranch, ch);
        }
    }

    // 루트 브랜치 생성
    generateRootBranch(rootBranch, ch) {
        this.accumulatedObj = this.composeBranchForm(rootBranch, ch);
        return rootBranch;
    }

    // 하위 브랜치 생성
    generateLowerBranch(branchType, ch) {
        const lowerBranch = {};
        this.composeBranchForm(lowerBranch, ch); // lowerBranch를 리턴한다. 
        this.accumulatedObjStack.push(this.accumulatedObj);
        let accumulatedObj = this.accumulatedObj.child;
        accumulatedObj.push(lowerBranch);
        if (!this.key) {
            this.accumulatedObj = accumulatedObj[accumulatedObj.length - 1];
        }
        if (this.key) {
            this.accumulatedObj = accumulatedObj[accumulatedObj.length - 1].value;
            this.key = "";
        }
        return branchType;
    }

    // 브랜치 요소 구성하기
    composeBranchForm(branchType, ch) {
        this.markStatus.brace = "opened";
        const map = { "[": "array", "{": "object" };
        if (map[ch] === "array" && !this.key)
            return this.composeObjectInfoBranch(branchType, map[ch], "object Array");
        if (map[ch] === "object" && !this.key)
            return this.composeObjectInfoBranch(branchType, map[ch], "object Object");
        if (map[ch] === "array" && this.key)
            return this.composeKeyValueBranch(branchType, map[ch], "object Array", this.key);
        if (map[ch] === "object" && this.key)
            return this.composeKeyValueBranch(branchType, map[ch], "object Object", this.key);
    }

    // 오브젝트 정보 브랜치 
    composeObjectInfoBranch(branchType, type, value) {
        branchType.type = type;
        branchType.value = value;
        branchType.child = [];
        return branchType;
    }

    // 키값 정보 브랜치
    composeKeyValueBranch(branchType, type, value, key) {
        branchType.key = key;
        branchType.value = {
            type: type,
            value: value,
            child: []
        }
        return branchType;
    }

    // 해당 문자열 건너뛰기
    skipCharacter(extractedString, ch) {
        if (ch === " " && extractedString === "") return true;
        if (ch === ",") this.markStatus.comma = "marked";
        if (ch === "," && extractedString === "") return true;
        if (ch === " " && this.token !== "") return true;
    }

    // 토큰 생성
    generateToken(extractedString, ch) {
        if (ch === " " && extractedString !== "") {
            return this.token = extractedString; // 추출 문자열을 바탕으로 토큰(분석 단위) 생성
        }
    }

    // 누락된 표현 탐지
    checkIsMissingExp(token) {
        if (this.checkIsMissingComma(token)) return true;
        if (this.checkIsMissingColon(token)) return true;
    }

    // 누락된 콤마 탐지
    checkIsMissingComma(token) {
        if (token !== "" && this.accumulatedObj.value === "object Array") {
            this.printCatchErrorMsg(',', "Array");
            return true;
        }
        if (token !== "" && this.accumulatedObj.value === "object Object" && this.key !== "") {
            this.printCatchErrorMsg(',', "Object");
            return true;
        }
        if (this.markStatus.brace === "closed" && this.markStatus.comma === "unmarked") {
            this.printCatchErrorMsg(',', "Object");
            return true;
        }
    }

    // 누락된 콜론 탐지
    checkIsMissingColon(token) {
        if (token !== "" && this.accumulatedObj.value === "object Object" && this.key === "") {
            this.printCatchErrorMsg(':', "Object");
            return true;
        }
    }

    // 오류 탐지 메시지 출력
    printCatchErrorMsg(...args) {
        console.log(`오류를 탐지하였습니다. '${args[0]}'이(가) 누락된 ${args[1]} 표현이 있습니다.`);
    }

    // 단계 낮추기
    reduceDepth(extractedString, ch) {
        if ((ch === "]" || ch === "}") && extractedString === "") {
            this.reduceDepthFromStack();
            this.key = "";
            return true;
        }
    }

    // 문자열 분석
    parseStringByType(extractedString, ch) {
        if (extractedString == "") return false;
        if ((ch === "," || ch === "]" || ch === "}") && extractedString !== "") {
            if (this.token == "") this.token = extractedString;
            if (this.identifyNumber(this.token, ch)) return true;
            if (this.identifyBoolean(this.token, ch)) return true;
            if (this.identifyString(this.token, ch)) return true;
        }
    }

    // 숫자 데이터 식별 
    identifyNumber(token, ch) {
        if (isNaN(Number(token))) return false;
        this.accumulatedObj.child.push(this.addChildInfo(token, "number")); // 숫자면 true; 
        this.initializeAfterParsing(ch);
        return true;
    }

    // Boolean, null 데이터 식별
    identifyBoolean(token, ch) {
        if (token !== "true" && token !== "false" && token !== "null")
            return false;
        if (token === "true")
            this.accumulatedObj.child.push(this.addChildInfo(true, "Boolean"));
        if (token === "false")
            this.accumulatedObj.child.push(this.addChildInfo(false, "Boolean"));
        if (token === "null") {
            this.accumulatedObj.child.push(this.addChildInfo(null, "null"));
        }
        this.initializeAfterParsing(ch);
        return true;
    }

    // 문자열 식별
    identifyString(token, ch) {
        if (this.checkErrorString(token)) {
            this.accumulatedObj.child.push(this.addChildInfo(token, "string"));
            this.initializeAfterParsing(ch);
        }
        return true;
    }

    // 문자열 오류 체크
    checkErrorString(token) {
        if (this.checkIsCorrectString(token)) return true;
        if (this.checkIsUnknownType(token)) return false;
        if (this.checkIsInCorrectString(token)) return false;
    }

    // 올바른 문자열 체크
    checkIsCorrectString(token) {
        if (token.startsWith("\'") &&
            token.endsWith("\'") &&
            token.match(/'/g).length == 2)
            return true;
    }

    // 알 수 없는 타입 체크
    checkIsUnknownType(token) {
        if (!token.startsWith("\'") && !token.endsWith("\'")) {
            console.log(`오류를 탐지하였습니다. ${token}는 알 수 없는 타입입니다.`);
            this.extractedString = "";
            this.token = "";
            return true;
        }
    }

    // 올바르지 않은 문자열 체크
    checkIsInCorrectString(token) {
        if (token.match(/'/g).length > 2 ||
            (!token.startsWith("\'") && token.endsWith("\'")) ||
            (token.startsWith("\'") && !token.endsWith("\'"))) {
            console.log(`오류를 탐지하였습니다. ${token}는 올바른 문자열이 아닙니다.`);
            this.extractedString = "";
            this.token = "";
            return true;
        }
    }

    // 각 타입에 해당하는 child 객체 생성 
    addChildInfo(token, type) {
        const childObj = {};
        if (this.key) childObj.key = this.key;
        childObj.type = type;
        childObj.value = token;
        if (!this.key) childObj.child = [];
        return childObj;
    }

    // 키 식별
    identifyKey(extractedString, ch) {
        if (ch === ":" && (this.token !== "" || extractedString !== "")) {
            this.key = extractedString;
            this.extractedString = "";
            this.token = "";
            return true;
        } else return false;
    }

    // 파싱 후 설정 초기화
    initializeAfterParsing(ch) {
        this.extractedString = "";
        this.key = "";
        this.token = "";
        if (ch === "]" || ch === "}") {
            this.reduceDepthFromStack();
            this.markStatus.brace = "closed";
            this.markStatus.comma = "unmarked";
        }
    }

    // 스택으로부터 depth 낮추기
    reduceDepthFromStack() {
        this.accumulatedObj = this.accumulatedObjStack.pop();
    }

} // end class

const arrayParser = new ArrayParser();

// 누락된 표현 탐지
console.log(JSON.stringify(arrayParser.operateArrayParser("{ a : 'x'  b : 'y' , c : 'z'} "), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("{ a  [ 1, 2, 3 ],  b : { k : 'v' , k2 : 'v2'},  k3 : 'v3' }"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("{ a : [ 1, 2, 3 ],  b  { k : 'v' , k2 : 'v2'},  k3 : 'v3' }"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("{ a : [ 1, 2, 3 ]  b : { k : 'v' , k2 : 'v2'},  k3 : 'v3' }"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("{ a : [ 1, 2, 3 ],  b : { k : 'v' , k2 : 'v2'}  k3 : 'v3' }"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10 20 , [[[ 30 , 40, 50 ]]], 60, 70 ]"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10, 20  [[[ 30 , 40, 50 ]]], 60, 70 ]"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10, 20 , [[[ 30 , 40, 50 ]]] 60, 70 ]"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ [1] , [3]  60, 70 ]"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10, 20 , [[[ 30 , 40, 50 ]]]  [100, 200, 300], [400, 500, 600], 60, 70 ]"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10, 20 , [[[ 30 , 40, 50 ]]], [100, 200, 300] , { key : 'value'}  [ 100, 200 ], 60, 70 ]"), null, 2));

// 비정상 괄호 탐지
// console.log(JSON.stringify(arrayParser.operateArrayParser("{ x : { k : 'v' } , y : { K : 'v' , k : 'v'} "), null, 2));
// console.log(JSON.stringify(arrayParser.operateArrayParser("[[]"), null, 2));
// console.log(JSON.stringify(arrayParser.operateArrayParser("{ person : { name : 'lee', age : 33 ,  addr : 'Seoul' }"), null, 2));
// console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10 , 20 , {  num : [100 , 200, 300   } , { num2 : 'aaa'   , 30 ]  "), null, 2));
// console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10  ,  [20 , 30] "), null, 2));
// console.log(JSON.stringify(arrayParser.operateArrayParser("[10 , [1,2,3] , 20 ,  30  "), null, 2)); // 한 칸 이상 띄어쓴 건 상관 없다. 딱 붙있는 게 문제다. 배열이든 객체든. 
// console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10 ,  {key : ['apple'] ,  20, 30 ]"), null, 2));
// console.log(JSON.stringify(arrayParser.operateArrayParser("[ 10 ,  {key : { fruit : 'apple' } } , 20, 30 "), null, 2));


// 배열, 객체 혼합 타입
console.log(JSON.stringify(arrayParser.operateArrayParser("{name : 'lee'  , age : 33, hobby : 'photo' }"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("{info : [{ name : 'lee', age : 34, addr : 'Seoul'} , {hobby : 'photo'}, 'endArr' ], study : 'codeSquad', place : 'Gangnam-gu'}"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("['1a3',[null,false,['11',[112233], {easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("{x:[10,20,[30,{y : 'apple'},50]]}"), null, 4)); // 
console.log(JSON.stringify(arrayParser.operateArrayParser("[{x:'apple' , y :'samsung'},10,[[[[[[true]]]]]],30]]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("{ tree1 : { tree2 : { tree3 : { tree4 : { tree5 : { tree6 : { tree7 : { tree8 : { tree9 : { tree10 : { top : [true]}}}}}}}}}}}"), null, 2));
console.log(JSON.stringify(arrayParser.operateArrayParser("{member1:'crong',member2:'honux',member3:'jk',member4:'pobi',a:{b:1,c:2,d:3},favorite:'milkTea',music:{genre : 'rock',artist:'lifeHouse',year:2014,country:'USA'}}"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[{a:{b:1,c:2,d:3}, favorite:'milkTea'}, {name:'lee', hobby:'photo'}]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[{x:'a', y:'b', z:'c'},{a:'x', b:'y', c:'z'}]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[{x:'a', y:12, z:44}, {y:'b'} {a:1, b:2, c:3}]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[{x:'a', y:'b', z:'c'}, {x:'a', y:'b', z:'c'}]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ { x : [1, 2, 3], y : [1,2,3], z : 'apple' }, 10  ]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ { x : 10,  y : 20 }, 10, [20, [30], 200], 100 ]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ 40, 50, 60, { name : 'lee', age : false}, 70, 80, 90, { x : [10,20,30]} ]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[{ x : { y : { z : { hobby : 'photo' } } } }, [10,20,30]]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[{ x : [10,20,{ hobby : 'photo'} ], name : 'lee' } ]"), null, 4));

// 무한 중첩 배열, 다양한 type
console.log(JSON.stringify(arrayParser.operateArrayParser("[10, 'apple' ,[ 20 , null,[ 30 , false , '32'], '23*6*1'], 11, 'helloween', 13, [22, ['33', [true] , 'iOS12.1'],23 , 'false'],14, 'theEnd' ]"), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser("[ '1a3',[ null, false,['11', [112233] , 112], 55   , 99 ], 33, true ]  "), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[1,false,\'apple\', null,5]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[\'1\',[2,true], [4,null]]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[123,[\'apple\'],33, [1,2,3,4,5]]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[10,[20,30, [40,50,60,70]]]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[10,[20,[30,[40,[50,[60,[70,[80,[90, [100]]]]]]]]]]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[[[[[[[[8]], 7]]],6]]]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[10,11, [[20,21]], [[[[[[[[[true]]]]]]]]], [[22,23]]]'), null, 4));
console.log(JSON.stringify(arrayParser.operateArrayParser('[10,[20,21,[30,31,32],233333],11,12,13,[22,[33,[40],34], 23,24],14,15]'), null, 4));