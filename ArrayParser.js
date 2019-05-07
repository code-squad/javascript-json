const Node = require('./Node');

class Tokenizer {
    tokenize(input) {
        let current = 0;
        const tokens = [];
        while (current < input.length) {
            const char = input[current];
            // 배열 시작'[' 확인
            if (char === '[') {
                tokens.push(new Node('arrStart', char));
                current++;
                continue;
            }

            // 배열 끝 확인
            if (char === ']') {
                tokens.push(new Node('arrEnd', char));
                current++;
                continue;
            }

            // 공백을 만나면 skip 한다.
            const WHITESPACE = /\s/;
            if (WHITESPACE.test(char)) {
                current++;
                continue;
            }

            // 쉼표를 만나면 token 에 넣는다. - 구분자
            const COMMA = ',';
            if (char === COMMA) {
                tokens.push(new Node('comma', char));
                current++;
            }

            else {
                tokens.push(new Node('element', char));
                current++;
            }

        }
        return tokens;
    }
}
