const errorMsg = require('./errorMsg.js');
const str = "['1a3', [null, false, ['11', [112233], 112], 55, '99'], 33, true]"

// Error Case
// const str = "['1a'3']"
// const str = "[3d3]"

const ArrayParser = class {
    constructor(){
        this.tokenArr = []
        this.lexerArr = [];
        this.openBracketIdxStack = [];
        this.parserArr = [];
    }
    tokenizer(str){
        let word = ""
        for(let token of str){
            if(token === "[" || token === "," || token === "]"){
                this.tokenArr.push(word)                                        
                word = ""
                if(token === "[" || token === "]"){this.tokenArr.push(token)} 
            }else{
                word = word + token.trim() 
            }
        }

        this.removeToken(this.tokenArr,"")
        
        return this.tokenArr
    }

    removeToken(arr,token){
        this.tokenArr  =  arr.filter(el => el !== token)
    }


    lexer(tokenArr){
        tokenArr.forEach((token)=>{
            const lexerObj = {}
            let lexerToken
            if (this.isArray(token)){
                lexerObj.type = "array"
                lexerObj.value = token
            }else{
                if (this.isNumber(token)){
                    lexerToken = Number(token)
                }else if(this.isString(token)){
                    if(token.match(/'/g).length%2 === 0){
                        lexerToken = token.match(/\w+/g)[0]
                    }else{
                        throw new Error(errorMsg.notString(token))
                    }
                }else if(this.isNull(token)){
                    lexerToken = null
                }else if(this.isBoolean(token)){
                    token === "true" ? lexerToken = true : lexerToken = false 
                }else{
                    throw new Error(errorMsg.syntaxError(token))
                }
                lexerObj.type = typeof(lexerToken)
                lexerObj.value = lexerToken
            }
            lexerObj.child = []
            this.lexerArr.push(lexerObj);
        });
        return this.lexerArr;
    }

    isArray(token){
        return token === '[' || token === ']' ? true : false
    }
    
    isNumber(token){
        return !isNaN(token) ? true : false
    }
    
    isString(token){
        return token[0] === "'" ? true : false
    }

    isNull(token){
        return token === "null" ? true : false
    }

    isBoolean(token){
        return token === "true" || token === "false" ? true : false
    }

    parser(str) {
        const token = arrayParser.tokenizer(str)
        const lexerArr = arrayParser.lexer(token)

        lexerArr.forEach((lexerObj)=>{
            let lexerObjIndex = lexerArr.indexOf(lexerObj)
            if(lexerObj.value ==="["){
                this.openBracketIdxStack.push(lexerArr.indexOf(lexerObj))
                this.parserArr.push(lexerArr[lexerObjIndex])
            }else if(lexerObj.value === ']'){ 
                this.openBracketIdxStack.pop();
            }else{
                this.parserArr[this.openBracketIdxStack.length-1].child.push(lexerObj)
            }
        })
        this.parserArr.reverse();
        this.parserArr.forEach((parserObj)=>{
            let parserObjIndex = this.parserArr.indexOf(parserObj)
            if(parserObjIndex !==0){
                parserObj.child.push(this.parserArr[parserObjIndex-1])
            }
        })
        this.parserArr = this.parserArr[this.parserArr.length-1]
        
        return this.parserArr 
    }


 }

const arrayParser = new ArrayParser()

const token = arrayParser.tokenizer(str)
const lexer = arrayParser.lexer(token)
//const parser = arrayParser.parser(str)
//console.log(JSON.stringify(parser, null, 2))
console.log(token)
console.log(lexer)


