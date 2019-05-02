const {log} = console;

// *싱글턴 객체는 인자로 주입할 수 없어서 불편한듯 
const ArrayParser = {
    tokenQueue :[],
    result: '',

    run(input){
        this.tokenize(input)
        // tokenQueue가 비었을때까지 렉싱과 파싱을 반복한다. 
        while(this.tokenQueue.length){
            const currentToken = this.tokenQueue.shift()
            const fetchLexToken =  this.lex(currentToken);
            this.parse(fetchLexToken);
        }
        return this.result 
    },
    // *함수명을 지을떄 tokenizer , lexier , parser 으로 지을지, 명사로 지을지 고민됨. 
    tokenize(input){
        // input을 [,12,[,34,],5] 로 쪼개고 tokenQueue에 넣는다. 
    },
    lex(token){
        isLestBracket(token) 
        isRightBreaket(token)
        isNumber(token)
        // tokenQueue의 값을 하나씩 빼서 배열([,])인지, 배열이 아닌지 확인한다. 
    },
    parse(){
        // 넘어온 인자가 [   이면 새로운 객체를 만든다.
        // 넘어온 인자가 숫자 이면 현재 객체의 child에 추가한다.
        // 넘어온 인자가 ]   이면 현재 객체의 부모객체에 추가한다.
    }

}

const str = "[123, 22, 33]";
const result = ArrayParser.run(str);
log(JSON.stringify(result, null, 2)); 
