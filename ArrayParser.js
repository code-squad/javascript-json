const { log } = console;

const ArrayParser = {
    historyStack: [],

    run(input) {
        const tokenQueue = this.tokenize(input)
        // 테스트코드 1 -> 
        // log(tokenQueue)
        const fetchedQueue = this.lex(tokenQueue);
        // 테스트코드 2 -> 
        // log(fetchedQueue)
        const resultTree = this.parse(fetchedQueue);
        return resultTree
    },

    tokenize(input) {
        return input.replace(/\[/g, '[,').replace(/\]/g, ',]').replace(/ /g, '').split(',');
    },

    lex(queue) {

        queue = queue.map(token => {
            if (token === 'null') return null;
            if (['true', 'false'].includes(token)) return (token === 'true');
            if (!isNaN(token)) return Number(token);
            if (token[0] === "'" && token[token.length - 1] === "'") return token.slice(1, -1)
            if (['[', ']'].includes(token)) return token
            else throw new Error(`${token}은 알수없는 타입입니다.`)
        })
        return queue.map(token => {
            if (['[', ']'].includes(token)) return { type: 'array', value: token, child: [] }
            else {
                if (typeof token === 'string' && token.includes("'")) throw new Error(`${token}은 올바른 문자열이 아닙니다.`)
                return { type: typeof (token), value: token, child: [] }
            }
        })

    },

    parse(queue) {
        while (queue.length) {
            const currentLexedObj = queue.shift()
            if (currentLexedObj.value === '[') {
                delete currentLexedObj.value
                this.historyStack.push(currentLexedObj)
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

            else {
                const last = this.historyStack.length - 1
                this.historyStack[last].child.push(currentLexedObj);
            }
        }
    }
}

// var str = "['1a3',[22,23,[11,[112233],112],55],3d3]"
// var str = "['1a'3',[22,23,[11,[112233],112],55],33]";
const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
// const str = "[1, 2, [ 3, [ 4, 5, [ 6 ], 7, [ 8, 9 ], 100 ]  ]  ]";
const result = ArrayParser.run(str);
// 테스트코드3 
log(JSON.stringify(result, null, 2));  