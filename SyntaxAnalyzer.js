
module.exports = class SyntaxAnalyzer {
    constructor({tokenizer, lexer, parser}){
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.parser = parser;
    }
    

    run(input) {
        const tokenQueue = this.tokenizer.cutInput(input)
        const fetchedQueue = this.lexer.createNode(tokenQueue);
        const resultTree = this.parser.makeTree (fetchedQueue);
        return resultTree
    }

}





