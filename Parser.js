module.exports = class Parser {
    constructor(){
        this.historyStack = [];
    }
    isKeyToken(token){
        return token.key !== undefined
    }

    isEmptyStack(){
        return this.historyStack.length === 0
    }

    isLeftBracket(token){
        const startParentToken = ['{','['];
        return startParentToken.includes(token)
    }

    isRightBracket(token){
        const endToken = ['}',']'];
        return endToken.includes(token)
    }

    isColon(token){
        return token.value === ':'
    }

    CreateParentNode(token){
        delete token.value;
        this.historyStack.push(token)
    }
    getToken(){
        return this.historyStack.pop()
    }

    pushParent(token){
        const topIndex = this.historyStack.length -1;
        this.historyStack[topIndex].child.push(token);
    }

    concatParent(token){
        delete token.value;
        const topToken= this.getToken();
        if(this.isKeyToken(topToken)){
            this.pushParent(topToken);
            const valueToken= this.getToken();
            this.pushParent(valueToken);
            return  
        }
        if(this.isEmptyStack()){
            return topToken
        }
        this.pushParent(topToken)
        
    }

    makeTree(queue){
        while (queue.length) {
            const currentLexedObj = queue.shift()

            if(this.isLeftBracket(currentLexedObj.value)){
                this.CreateParentNode(currentLexedObj)
                continue
            }
            if(this.isRightBracket(currentLexedObj.value)){
                const totalParsedTree = this.concatParent(currentLexedObj);
                if(totalParsedTree) return totalParsedTree 
                continue
            }

            if (this.isKeyToken(currentLexedObj)) {
                this.historyStack.push(currentLexedObj)
                continue
            }

            if(this.isColon(currentLexedObj)){
                continue
            }


            this.pushParent(currentLexedObj)
            
            if(this.isKeyToken(this.historyStack[this.historyStack.length-1])){
                const keyToken= this.getToken();
                this.pushParent(keyToken);
            }

            
        }
    }

    
}


