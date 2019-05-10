const lexer = {
    //Todo : String 에 ',' ' ' '[]' 포함하면 ...?, 마지막에 시간 남으면 해보기.
    tokenize(string) {
        const noWhiteSpaceString = string.replace(/ /g, '');
        return noWhiteSpaceString.split(/([\[\]])|,/).filter((value) => value);
    },
    
    lex(string) {
        const tokens = this.tokenize(string);
        const lexedTokens = this.attatchNameToTokens(tokens);
        return lexedTokens;
    },

    attatchNameToTokens(tokens) {
        return tokens.map((token) => {
            if(token === '[') {
                token = {'name' : 'arrayOpener', 'value' : token};
                return token;
            } else if(!isNaN(token)) {
                token = {'name' : 'number', 'value' : token};
                return token;
            } else if(token === 'true' || token === 'false') {
                token = {'name' : 'boolean', 'value' : token};
                return token;
            } else if(!(token.search(/[',"].+[',"]/) === -1)) {
                token = {'name' : 'string', 'value' : token};
                return token;
            } else if(token === 'null') {
                token = {'name' : 'null', 'value' : token};
                return token;
            } else if(token === ']') {
                token = {'name' : 'arrayCloser', 'value' : token};
                return token;
            } else {
                token = {'name' : undefined, 'value' : token};
                return token;
            }
        }, []);
    }
}

module.exports = lexer;