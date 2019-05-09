// { type: 'array',
//   child: 
//    [ { type: 'number', value: '123', child: [] },
//      { type: 'number', value: '22', child: [] },
//      { type: 'number', value: '33', child: [] } 
//     ] 
// }

const str = "['1a3',[null,false,['11',[11223123],112],55, '99'],33, true]"

const ArrayParser = class {
    constructor(){
        this.tokenArr = []
        this.lexerArray = [];
    }

    removeToken(arr,token){
        arr.forEach((arrParam) => {if(arrParam===token){arr.splice(arr.indexOf(token),1)}})
    }

    tokenizer(str){
        let word = ""
        for(let i = 0; i<str.length; i++){
            if(str[i] === "[" || str[i] === "," || str[i] === "]"){
                this.tokenArr.push(word)                                        //일반토큰 푸쉬
                word = ""
                if(str[i] === "[" || str[i] === "]"){this.tokenArr.push(str[i])} //배열 토큰 푸쉬
            }else{
                if(!(str[i] ===" " && str[i] === "[")){word = word + str[i]} //일반 토큰 생성
            }
        }
        this.removeToken(this.tokenArr,"")
        return this.tokenArr
    }

    lexer(arr){
        this.removeToken(arr,"]")
        arr.forEach((token)=>{
            const lexerObj = {}
            let lexerToken
            if (token === '['){
                lexerObj.type = "array"
            }else if(token !== ']'){
                if (!isNaN(token)){
                    lexerToken = Number(token)
                }else if(token[0] === "'"){
                    lexerToken = token.match(/\w+/g)[0]
                }else if(token === "null"){
                    lexerToken = null
                }else if(token === "true" || token === "false"){
                    lexerToken = Boolean(token)
                }
                lexerObj.type = typeof(lexerToken)
                lexerObj.value = lexerToken
            }
            lexerObj.child = []
            this.lexerArray.push(lexerObj);
        });
        return this.lexerArray;
    }
}

const arrayParser = new ArrayParser()
const token = arrayParser.tokenizer(str)
console.log(token.length)
console.log(arrayParser.lexer(token))


const lexer = (arr) => {
    let i = 0;
    let Que = [];
    let word = "";
    let bracketStack = [];

    // 배열 재배치
    arr = arr.split("");
    arr.shift()
    arr.pop()
    arr.push(",")

    while(i<= arr.length-1){
        // 띄어쓰기
        if (arr[0] ===" "){
            arr.shift()
        }
        // 배열
        else if (arr[0] === "["){
            // 배열 스트링 화 시키기
            word = ""
            while(i<= arr.length-1){ 
                if(arr[i] === "["){
                    bracketStack.push(arr[i]);
                }
                word = word+ arr[i];
                arr.shift()
                if(arr[i] === "]"){
                    bracketStack.shift();
                    word = word+ arr[i];
                    arr.shift()
                }
                if(bracketStack[0] === undefined){
                    break;
                }
            }
            arr.shift();

            // 배열 재귀
            let dpAnswer = lexer(word);
            Que.push(dpAnswer);
        }
        // string
        else if (arr[0] ==="'"){
            arr.shift() // string 시작 "'" 제거
            word = ""
            while(i<= arr.indexOf(',')){
                if(arr[i] === "'"){
                    arr.shift() // string 마지막 "'" 제거
                }else{
                    word = word+ arr[i];
                    arr.shift()
                } 
                if(arr.indexOf(',') === 0) { // word 단위
                    break
                }
            }
            Que.push(word)
            arr.shift()
        }

        // not string, array => number, boolean, null
        else{
            word = ""
            // word 형성
            while(i<= arr.indexOf(',')){
                word = word+ arr[i];
                arr.shift()
                if(arr.indexOf(',') === 0) { // word 단위
                    break
                }
            }
            // boolean or null or Number check
            if(word === "true" || word === "false"){
                word = Boolean(word)
            }else if(word === "null"){
                word = null;
            }else if(typeof(Number(word))==="number"){
                word = Number(word)
            }
            // word push
            arr.shift()
            Que.push(word);
        }
    }
    return Que
}

console.log(JSON.stringify(lexer(str), null, 2))
//console.log(arr)