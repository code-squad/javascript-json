
class Lexer {

    run(token) {
        // 더 쉽고 간단한 방법이 있을지 고민해보자.
        if ("[]".includes(token)) return 'array';
        if (token === 'true' || token === 'false') return 'boolean';
        if (token === 'null') return 'null';
        if (`'"`.includes(token[0]) && `'"`.includes(token[token.length - 1])) return 'string';

        return 'number';
    }

}