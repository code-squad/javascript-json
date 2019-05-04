const ArrayParser = class {
    constructor(str) {
        this.str = str;
    }

    tokenizer() {
        const charArr = this.str.split("").filter((char) => !parserutils.isType(char, parserutils.dataType.whitespace));
        const tokenArr = charArr.reduce((acc, val, index) => {
            
            let numberCount = 0;
            
            if (parserutils.isType(val, parserutils.dataType.number)) {
                let [numberElement, idx] = [``, index];

                while (parserutils.isType(charArr[idx], parserutils.dataType.number)) {
                    [numberElement, idx, numberCount] = [numberElement+charArr[idx], idx+1, numberCount+1]
                }
                acc.push(numberElement);

            } else {
                acc.push(val);
            }

            charArr.splice(index, numberCount-1);
            return acc;

        }, []);

        return tokenArr;
    }

    lexer() {
        const lexicalObjArr = this.tokenizer().filter((char) => !parserutils.isType(char, parserutils.dataType.seperator))
        .reduce((acc, token) => {
            let tokenObj = {};
            [tokenObj.type, tokenObj.value] = [parserutils.getDataType(token), token];
            acc.push(tokenObj);
            return acc;
        }, [])

        return lexicalObjArr;
    }
}