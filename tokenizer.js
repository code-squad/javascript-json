module.exports = function tokenizer(str) {
    const tokens = [];

    const pushToken = (token) => tokens.push(token);
    const initToken = () => token = '';
    const concatChar = (char) => token += char;

    let token = '';

    for (let char of str) {
        if (char === '[') {
            concatChar(char);
            pushToken(token.trim());
            initToken();
        }
        else if (char === ',' || char === ']') {
            if (token) pushToken(token.trim());
            initToken();
            if (char === ']') pushToken(char);
        }
        else {
            concatChar(char);
        }
    }

    if (token) pushToken(token.trim());

    return tokens;
}