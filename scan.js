class Scan {
    constructor() {
        this.tokens = [];
        this.stack = "";
        this.stringOpened = false;
        this.tokenMap = {
            end: ["]", "}"],
            dividingPoints: ["[", "]", "{", "}", ":", ","]
        }
    }

    tokenize(str) {
        for (let token of str) {
            if (token === " ") {continue;}
            if (!this.stringOpened && this.tokenMap.dividingPoints.includes(token)) {
                this.isDivididingPoints(this.tokens, token, this.stack, this.stringOpened);
            } else if (this.token === "'") {
                this.stack += token;
                this.stringOpened = (this.stringOpened) ? false : true;
            } else if (!this.tokenMap.dividingPoints.includes(token)) {
                this.stack += token;
            }
        }
        return this.tokens;
    };

    setTokens(tokens, token, stack) {
        stack.length ? tokens.push(stack) : tokens.push(token);
        return tokens;
    };

    isDivididingPoints(tokens, token, stack, stringOpened) {
        this.setTokens(tokens, token, stack);
        this.stack = "";
        if (!stringOpened && this.tokenMap.end.includes(token) || token === ':') {
            tokens.push(token);
        }
    }
}

module.exports = Scan