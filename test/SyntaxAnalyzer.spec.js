const SyntaxAnalyzer = require('../SyntaxAnalyzer');
const Tokenizer = require('../Tokenizer')
const Lexer = require('../Lexer');
const Parser = require('../Parser');
const assert = require('assert');

describe('ArrayParser test!', () => {
    const tokenizer = new Tokenizer();
    const lexer = new Lexer();
    const parser = new Parser();
    const myapp = new SyntaxAnalyzer({tokenizer,lexer,parser});
    const input = "[1, 2, [ 3, 4 ], 5 ]"

    let answer;
    let tokenQueue;
    let fetchedQueue;

    describe('1) tokenize test', () => {
        before('create answer', () => {
            answer = ['[', '1', '2', '[', '3', '4', ']', '5', ']']
        });
        it('should return tokenized array', () => {
            // console.log(MyArrayParser.tokenize(input))
            assert.deepEqual(myapp.tokenizer.cutInput(input), answer)

        })

        after('initailize tokenQueue', () => {
            tokenQueue = answer
            // tokenQueue =myapp.tokenizer.cutInput(input)
        })
    });
    describe('2) lex test', () => {
        before('create answer', () => {
            answer = [{ type: 'array', value: '[', child: [] },
            { type: 'number', value: 1, child: [] },
            { type: 'number', value: 2, child: [] },
            { type: 'array', value: '[', child: [] },
            { type: 'number', value: 3, child: [] },
            { type: 'number', value: 4, child: [] },
            { type: 'array', value: ']', child: [] },
            { type: 'number', value: 5, child: [] },
            { type: 'array', value: ']', child: [] }
            ]
        });
        it('should return lexed array', () => {
            assert.deepEqual(myapp.lexer.createNode(tokenQueue), answer)
        });
        after('initialize fetcedQueue',()=>{
            fetchedQueue = myapp.lexer.createNode(tokenQueue)
        })
    });
    describe('3) parse test', () => {
        before('create answer',()=>{
            answer = { type: 'array',
            child: 
             [ { type: 'number', value: 1, child: [] },
               { type: 'number', value: 2, child: [] },
               { type: 'array', child: [
                { type: 'number', value: 3, child: [] },
                { type: 'number', value: 4, child: [] },
               ] },
               { type: 'number', value: 5, child: [] }, 
            ] }
        })

        it('should return parse Tree', ()=>{
            assert.deepEqual(myapp.parser.makeTree (fetchedQueue), answer)
        })
        
    });
});