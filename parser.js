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
        console.log(this.tokenArrayVisited);
    }

    execute(strValue) {
        const strArray = this.tokenizer.split(this.tokenizer.removeWhiteSpace(strValue));
        console.log(strArray);
        const tokenArray = this.lexer.analyze(strArray);
        console.log(tokenArray);
        this.initTokenArrayVisited(tokenArray);
    }
}

module.exports = Parser;

