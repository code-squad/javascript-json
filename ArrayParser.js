const { log } = console;


const ArrayParser = {
    historyStack: [],

    run(input) {
        const tokenQueue = this.tokenize(input)
        // 테스트코드 1 -> 
        // log(this.tokenQueue)
        const fetchedQueue = this.lex(tokenQueue);
        // 테스트코드 2 -> 
        // log(tokenQueue)
        const resultTree = this.parse(fetchedQueue);
        return resultTree
    },


    tokenize(input) {

        const tokens = input.replace(/\[/g, '[,').replace(/\]/g, ',]').replace(/ /g, '').split(',');
        return tokens.map(el => isNaN(Number(el)) ? el : Number(el));
    
    },

    lex(queue) {
         return queue.map(token => {
            if (!isNaN(token)) return { type: typeof (token), value: token, child: [] }
            if (['[', ']'].includes(token)) return { type: 'array', value: token, child: [] }
        })
    },


    parse(queue) {

        while (queue.length) {
            const currentLexedObj = queue.shift()

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
                    // this.resultTree = tempResultTree
                    return tempResultTree
                }
            }




        }



    }

}

// const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const str = "[1, 2, [ 3, [ 4, 5, [ 6 ], 7, [ 8, 9 ], 100 ]  ]  ]";
const result = ArrayParser.run(str);
// 테스트코드3 
log(JSON.stringify(result, null, 2)); 
