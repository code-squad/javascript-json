class ArrayParser {

    tokenizer(string) {
        string = string.split('');
        const array = [];
        let token = '';

        while (string.length > 0) {
            const onePiece = string.shift();
            if (onePiece === '[') {
                array.push(onePiece);
                continue;
            }
            if (onePiece === ']') {
                if (token !== '') {
                    array.push(token);
                }
                array.push(onePiece);
                token = '';
                continue;
            }
            if (onePiece === ',') {
                if (token !== '') array.push(token)
                token = '';
                continue;
            }
            token += onePiece;
        }

        return array.map(x => x.trim());
    }

    lexer(token) {
        // 더 쉽고 간단한 방법이 있을지 고민해보자.
        if ("[]".includes(token)) return 'array';
        if (token === 'true' || token === 'false') return 'boolean';
        if (token === 'null') return 'null';
        if (`'"`.includes(token[0]) && `'"`.includes(token[token.length - 1])) return 'string';

        return 'number';
    }
}