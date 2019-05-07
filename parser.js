class Parser {
    constructor(tokenizer, lexer) {
        // tokenArray에 있는 객체가 Node를 만들었음을 체크하기 위한 배열을 생성할 예정.
        // (tokenArray가 만들어지면 생성하기 위해서 undefined로 지정)
        this.tokenArrayVisited = undefined;
        this.tokenizer = tokenizer;
        this.lexer = lexer;
    }

    initTokenArrayVisited(tokenArray) {
        this.tokenArrayVisited = new Array(tokenArray.length);
        this.tokenArrayVisited.fill(false);
    }

    execute(strValue) {
        const strArray = this.tokenizer.split(this.tokenizer.removeWhiteSpace(strValue));
        const tokenArray = this.lexer.analyze(strArray);
        this.initTokenArrayVisited(tokenArray);
    }

    // 재귀 호출 하면서 loop를 순회하는데 방문한적이 있는지 확인해주는 메소드
    isVisited(tokenArray, token) { return this.tokenArrayVisited[tokenArray.indexOf(token)]; }

    setVisit(tokenArray, token) { this.tokenArrayVisited[tokenArray.indexOf(token)] = true; }

    makeNode(tokenArray, depth) {
        const node = { 'type' : 'array', 'child' : [] };
        for (const token of tokenArray) {
            if (this.isVisited(tokenArray, token)) continue;
            if (token.depth < depth) break;
            else if (token.depth > depth) {
                node.child.push(this.makeNode(tokenArray, depth+1));
            } else {
                node.child.push({'type' : token.type, 'value' : token.value, 'child' : []});
                this.setVisit(tokenArray, token);
            }
        }
        return node;
    }
}

module.exports = Parser;

