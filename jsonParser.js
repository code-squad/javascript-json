class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const array = "[123,[22, 33],44]";
const WholeDataStack = [];


function ArrayParser(array) {
    while (array.length === 0) {
        //토큰 자르고 토큰wholeDataStack 에 넣고
        const token = getToken(array)
        WholeDataStack.push(token)
        array = array.replace(token, '')
    }
    
    return analyzeStack(WholeDataStack)
}
function getToken(string) {
    //, [ or ]가 나오면 따로뽑아냄
}
function stackPusher(token) {
    stack.push(token)
}
function stackPoper() {
    return stack.pop()
}
function stackChecker(stack) {
    if (stack[stack.length - 1] === ']') {
        while (stack[stack.length - 1] === '[') {
            child.push(getConditionKey(value))//뽑아서 분석
        }
        //한개 더 뽑
    }
}
function analyzeStack(stack) {
    //스택 하나하나 앞에서부터 빼며 '['이 나오면 
    //array상태인 객체를 하나 만들며 child배열을 만듬.
    //그 child배열에 ]값이 나올때 까지 추가
    //결과값으로 제이슨데이터 리턴 
}
function printJSONData(JSONData) {
    console.log(JSON.stringify(data, null, 2))
}

//printJSONData(ArrayParser(array))