const {log} = console;

<<<<<<< HEAD
// *싱글턴 객체는 인자로 주입할 수 없어서 불편한듯 
const ArrayParser = {
    tokenQueue :[],
    result: '',
=======
const ArrayParser = {
    tokenQueue: ['[', 12, 34, '[', 56, ']', 78, ']'],
    historyStack: [],
    resultTree: '',
    ////// -> resultTree에 언제 결과를 넣어주어야하지? 처음부터? 아니면 마지막에? 
    ////// <- 해결방법1. 애초에 historyStack에 배열객체를 하나 넣어놓는다. 처음은 무조건 [로 시작할테니, 그리고 뺴지않는다. 
    ////// <- 해결방법2. 마지막에 historyStack을 pop할때마다 임시resultTree로 받게하고, histryStack이 비었을때 resultTree를 리턴한다.
    //////             결과를 return하는과정도 parse의 일부이므로 resultTree를 따로 객체의 속성으로 만들어도될것같고, parse함수내부에 변수로 
    //////             만들어도 될것같다. 이건 취향차이일듯? 
>>>>>>> 9d1b888... docs: 3차설계, 불필요한 주석삭제

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

   
    tokenize(input) {
        // input을 [,12,[,34,],5] 로 쪼개고 tokenQueue에 넣는다. 
    },
    lex(token) {
        if (isNaN(token)) return { type: 'number', value: token, child: [] }
        if (['[', ']'].includes(token)) return { type: 'array', child: [] }

        
        // -> tokenNode를 lex과정에서 만들어야할지, parse과정에서 만드는게 의미에 맞을까?  우선은 lex에 넣었다.
        // <- 생각해보니 객체를 lex에서도 만들고, parse에서도 가공하기때문에 lex에서 한번에 처리하는게 더 좋은것같다! 우선 2차설계커밋하고 수정할예정!
        ////// lex과정에서 return할때 출력해야할 tokenNode의 구조에 맞게 가공해서 return함!
    },


    parse(obj) {
    // 넘어온 인자가 [   이면 새로운 객체를 만든다.
    //// [의 경우 historyStack에 넣는다. 
    // 넘어온 인자가 숫자 이면 현재 객체의 child에 추가한다.
    //// value인 경우 historyStack의 가장위의객체에 push한다. (이때 포인터변수는 따로 필요없다! 스택에 가장위가 포인터역할을하기때문이다.) 
    // 넘어온 인자가 ]   이면 현재 객체의 부모객체에 추가한다.
    //// ]의 경우 스택에서 뺸다 , 그리고 push한다. 이때 만약에 historyStack이 비면 push하지 않는다. 
    ////혹은 처음부터 historyStack이 비어있지 않을떄만 push한다.

    

>>>>>>> 9d1b888... docs: 3차설계, 불필요한 주석삭제
    }

}

const str = "[123, 22, 33]";
const result = ArrayParser.run(str);
log(JSON.stringify(result, null, 2)); 
