const {log} = console;


const ArrayParser = {
    tokenQueue:[],
    historyStack: [],
    resultTree: {},


    run(input){
        this.tokenize(input)



        while (this.tokenQueue.length) {
            const currentToken = this.tokenQueue.shift()

            const fetchLexTokenObj = this.lex(currentToken);
            this.resultTree = this.parse(fetchLexTokenObj);
        }
        return this.resultTree
    },


    tokenize(input) {

        const tokens = input.replace(/\[/g, '[,').replace(/\]/g, ',]').replace(/ /g,'').split(',');
        const convertedTokens = tokens.map(el=>isNaN(Number(el))?el:Number(el));        
        this.tokenQueue = convertedTokens
    },
    lex(token) {
        ////// -> number , array 를 하드코딩하지 않는 방법이있을까? array를 모르겠다.. 
        if (!isNaN(token)) return { type: typeof (token), value: token, child: [] }
        if (['[', ']'].includes(token)) return { type: 'array', value: token, child: [] }



    },


    parse(obj) {

        if (obj.value === '[') {
            delete obj.value
            this.historyStack.push(obj)
            return
        }

        if (obj.type === 'number') {
            const last = this.historyStack.length - 1
            this.historyStack[last].child.push(obj);
            return
        }

        if (obj.value === ']') {
            delete obj.value
            const tempResultTree = this.historyStack.pop();
            const newLast = this.historyStack.length - 1

            // 혹은 newLast가 0이 아니면 
            if (this.historyStack.length) {
                this.historyStack[newLast].child.push(tempResultTree);
            } else {
                return tempResultTree
            }


        }



    }

}


const str = "[1, 2, [ 3, [ 4, 5, [ 6 ], 7, [ 8, 9 ], 100 ]  ]  ]";
const result = ArrayParser.run(str);
log(JSON.stringify(result, null, 2)); 
