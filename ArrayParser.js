const { log } = console;


const ArrayParser = {
    tokenQueue: [],
    historyStack: [],
    resultTree: {},


    run(input) {
        this.tokenize(input)
        // 테스트코드 1 -> log(tokenQueue)
        this.lex();
        // 테스트코드 2 -> log(tokenQueue)
        this.parse();
        return this.resultTree
    },


    tokenize(input) {

        const tokens = input.replace(/\[/g, '[,').replace(/\]/g, ',]').replace(/ /g, '').split(',');
        const convertedTokens = tokens.map(el => isNaN(Number(el)) ? el : Number(el));
        this.tokenQueue = convertedTokens
    },

    lex() {
        this.tokenQueue = this.tokenQueue.map(token => {
            if (!isNaN(token)) return { type: typeof (token), value: token, child: [] }
            if (['[', ']'].includes(token)) return { type: 'array', value: token, child: [] }
        })
    },


    parse() {

        while (this.tokenQueue.length) {
            const currentLexedObj = this.tokenQueue.shift()

            if (currentLexedObj.value === '[') {
                delete currentLexedObj.value
                this.historyStack.push(currentLexedObj)

            }

            else if (currentLexedObj.type === 'number') {
                const last = this.historyStack.length - 1
                this.historyStack[last].child.push(currentLexedObj);

            }
            else if (currentLexedObj.value === ']') {
                delete currentLexedObj.value
                const tempResultTree = this.historyStack.pop();
                const newLast = this.historyStack.length - 1

                if (this.historyStack.length) {
                    this.historyStack[newLast].child.push(tempResultTree);
                } else {
                    // 이렇게 넣고 while안에 queue길이 0일때까지 돌리는 방식으로 해도되고
                    this.resultTree = tempResultTree
                    // return 으로 전달해줘도 될것같음. 이건 취향에 따라 다른듯
                }
            }




        }



    }

}


const str = "[1, 2, [ 3, [ 4, 5, [ 6 ], 7, [ 8, 9 ], 100 ]  ]  ]";
const result = ArrayParser.run(str);
// 테스트코드3 
log(JSON.stringify(result, null, 2)); 
