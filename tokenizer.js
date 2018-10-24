module.exports = function tokenizer(str) {
    const tokens = [];
    let token = '';
    let bStrClosed = true;

    for (let char of str) {
        if (char === "'") {
            token += char;
            bStrClosed = !bStrClosed;
        }
        else if (char === '[') {
            if (!bStrClosed) throw token;
            token += char;
            tokens.push(token.trim());
            token = '';
        }
        else if (char === ',' || char === ']') {
            if (!bStrClosed) throw token;

            tokens.push(token.trim());
            token = '';
            if (char === ']') token += char;
        }
        else {
            token += char;
        }
    }

    tokens.push(token.trim());

    return tokens;
}