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

class Lexer {
    lex(input){
        let current = 0;
        const tokens = [];
        while (current < input.length) {
            let char = input[current];
            // 숫자(음수, 소수 포함)를 만나면 type 을 number 로 주고 tokens 에 push 한다.
            if (isFinite(Number(char.value)) || char.value === '-' || char.value === '.' ) {
                // 숫자값을 담을 value 변수를 선언.
                let value = '';

                // 숫자를 만나면 value 변수에 할당한다.
                while (isFinite(Number(char.value)) || char.value === '-' || char.value === '.') {
                    value += char.value;
                    char = input[++current];
                }

                // tokens array 에 'number' token 을 push 한다.
                tokens.push({
                    type: 'number',
                    value,
                    child: [],
                });
            }
            else {
                tokens.push({
                    type: char.type,
                    value: char.value
                });
                current++
            }
        }
        return tokens;
    }
}

class ArrayParser {
    parse(tokens){
        // AST(Abstract Syntax Tree): root. type 이름은 'Array'
        let ast = {
            type: 'Array',
            child: [],
        };

        tokens.filter(function (e) {
            return e.type === 'number'
        }).map(function (e) {
            return ast.child.push(e)
        });

        return ast;
    }
}