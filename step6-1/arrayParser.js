const parserutils = require('./parserUtils.js');
const ParseTree = require('./parseTree.js');
const Stack = require('./stack.js');

const ArrayParser = class {
    constructor(str) {
        this.parseTree = new ParseTree();
        this.stack = new Stack();
        this.str = str;
    }

    tokenizer() {
        const charArr = this.str.split("").filter((char) => !parserutils.isType(char, parserutils.dataType.whitespace));
        const tokenArr = charArr.reduce((acc, val, index) => {
            let numberCount = 0;
            
            if (parserutils.isType(val, parserutils.dataType.number) || parserutils.isType(val, parserutils.dataType.sign)) {
                let [numberElement, idx] = [`${val}`, index+1];

                while (parserutils.isType(charArr[idx], parserutils.dataType.number || parserutils.dataType.sign)) {
                    [numberElement, idx, numberCount] = [numberElement+charArr[idx], idx+1, numberCount+1]
                }
                acc.push(numberElement);

            } else {
                acc.push(val);
            }

            charArr.splice(index, numberCount);
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

    parser() {
        this.lexer().forEach((obj) => {
            this.parseTree.insert(obj, this.stack);
        });

        if (!this.stack.isEmpty()) throw new Error('올바른 데이터 형식이 아닙니다 (시작 괄호가 더 많습니다)');
        return this.parseTree;
    }
}

module.exports = ArrayParser;