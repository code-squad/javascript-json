const str = "['1a3', [null, false, ['11', [112233], 112], 55, '99'], 33, true]";

class ArrayParser {
    constructor() {
        this.stack = [];
    }

    tokenizer(string) {
        return string.split(' ').join('').replace(/\[/g, '[,').replace(/\]/g, ',]').split(',');
    }

    lexer(token) {
        // 토큰이 들어오면 type을 구분하여 반환하자.
        return [type, token];
    }

    parser(type, token) {
        // 토큰과 그 타입이 들어오면 자료형태로 바꾸어 반환하자.
        return { type: type, value: token, child: [] };
    }

    run(array) {
        // tokenizer한 배열이 들어오면 하나씩 빼서 lexer와 parser를 이용해 stack에 쌓고 빼는 작업을 해주자. (아마 재귀로 구현될것 같음.)
        // 그리고 stack의 요소들이 모두 합쳐지면 그것을 반환하도록 하자.
        if (typeof stack[0] === 'object') return stack[0];
        const token = array.pop();
        [type, token] = lexer(token);
        const _stack = parser(type, token);
        stack.push(_stack);
        return array
    }
}