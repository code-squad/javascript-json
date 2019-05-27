module.exports = class Lexer {
    createNode(queue) {
        const typedTokenQueue = this.setNode(queue);
        return this.getNode(typedTokenQueue);
    }

    setNode(queue) {

        const typeMap = {
            null: null,
            true: true,
            false: false, 
            "[": '[', 
            "]": ']',
            "{": '{',
            "}": '}',
            ":": ':'
        }
        
        
        return queue.map(token => {
            if (typeMap.hasOwnProperty(token)) return typeMap[token]
            else if(!isNaN(token)) return Number(token);
            else if(token[0] === "'" && token[token.length - 1] === "'") return token.slice(1, -1)
            // string의 경우 ""를 뗀 다음에 보내므로
            // key의 경우 상태를 알려주어야한다. 
            else return ['key',token]
            // else throw new Error(`${token}은 알수없는 타입입니다.`)
        })
    }
    getNode(queue) {
        return queue.map(token => {
            if (['[', ']'].includes(token)) return { type: 'array', value: token, child: [] }
            else if (token[0] === 'key'){
                return { key: token[1], child:[] }
            }
            else if (['{','}',':'].includes(token)) return { type: 'object', value: token, child: [] }
            else {
                if (typeof token === 'string' && token.includes("'")) throw new Error(`${token}은 올바른 문자열이 아닙니다.`)
                // 넘어온 문자열이 "'abc'" 이면 문자열 'abc'이면 key 
                return { type: typeof (token), value: token, child: [] }
            }
        })

    }


}