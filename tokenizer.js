module.exports = function tokenizer(str) {
    const tokens = [];
    let token = '';

    for (let char of str) {
        if (char === '[') {
            token += char;
            tokens.push(token.trim());
        }
        else if (char === ',' || char === ']') {
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