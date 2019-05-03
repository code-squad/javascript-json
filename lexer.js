const Node = require('./node');

class Lexer {
    decideType(token) {
        if (token === '[') {
            return new Node('array');
        }
        if (isFinite(token) && token !== null) {
            return new Node('number', token);
        }
        if (token === ']') {
            return new Node('end');
        }
    }
}
module.exports = Lexer;