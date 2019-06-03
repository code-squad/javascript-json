module.exports = {
    errorComment: {
        invalidString: '올바른 문자열이 아닙니다.',
        invalidData: '올바른 data형식이 아닙니다.',
        noData: 'Parsing할 수 있는 data가 없습니다.',
        inappropriateClose: '배열이나 객체가 정상적으로 닫히지 않았습니다.',
    },

    stack: [],

    stringValidator: function(tokenizedList) {
        let isString = true;
        tokenizedList.forEach( word => {
            for(let i = 1; i < word.length-1; i++) {
                if(word[i] === "'") isString = false
            }
        });
        if(!isString) throw new Error(this.errorComment.invalidString);
    },

    dataValidator: function(tokenizedList) {
        const len = tokenizedList.length
        if(tokenizedList[0] !== '[' && tokenizedList[len-1] !== ']') {
               throw new Error(this.errorComment.invalidData);
        }
    },

    isData: function(tokenizedList) {
        if(!tokenizedList.length) throw new Error(this.errorComment.noData);
    },

    separatorChecker: function(tokenizedList) {
        tokenizedList.forEach( token => {
            if(token === '[' || token === '{') this.appendInStack(token);
            else if(token === ']' || token === '}') {
                const openSeparator = this.stack.pop();
                if(this.getSepaType(openSeparator) !== this.getSepaType(token)) throw new Error(this.errorComment.inappropriateClose);
            }
        });
        if(this.stack.length) throw new Error(this.errorComment.inappropriateClose);
    },

    getSepaType: function(token) {
        if(token === '[' || token === ']') return 'array';
        if(token === '{' || token === '}') return 'object';
    },

    appendInStack: function(token) {
        this.stack.push(token);
    },

    getLastType: function() {
        const len = this.stack.length;
        return this.stack[len];
    }
}