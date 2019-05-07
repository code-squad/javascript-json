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
}