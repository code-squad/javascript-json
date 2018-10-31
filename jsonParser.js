class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}
const array = '[123,[11, 22],33]'
const str = array.replace(/ /gi, "")
//토큰을 구별해내는 함수, 토큰을 분석하는 함수
//- 의미있는 token. 어떻게 보면 처음에 주어지는 값 또한 의미있는 token이 될 수 있다.
//그 토큰을 또 쪼개고 쪼개고 하는 방식으로 생각해보자.
//- token이 array라면 JSONData를 만들때 child를 만드는 함수를 사용하고 array가 아니라면 
//child를 만드는 함수가 아닌 그냥 type 과 value를 이용해서 JSONData를 만들어보도록 하자.
function printJSONData(data) {
    console.log(data)
}
//printJSONData(arrayParser(array)) => ret
function removeBlank(array) {
    return array.replace(/ /gi, '')
}

function arrayParser(array) {
    const str = removeBlank(array)
    const type = getType(str)
    const value = str
    const child = []
    if(type === 'array') {
        var i = 0
        while(str.length !== 0) {
            const token = getToken(str)
            child.push(arrayParser(token))
            str = removeBeforeToken(str)
            i++
            if(i > 5) break;
        }
    }
    return new JSONData(type, value, child) 
}

function removeBeforeToken(str) {

}

function getToken(str) {

}

function analyzeToken(token) {

}

