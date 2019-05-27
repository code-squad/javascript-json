const Lexer = require('../Lexer');
const assert = require('assert');

describe('Lexer Test',()=>{
    const lexer = new Lexer();
    // const input =  ['[', '1', '2', '[', '3', '4', ']', '5', ']'];
    const input = ['[', "'1a3'", '{', 'easy', ':', '[', "'hello'", '{', 'a',':',"'a'",'}',"'world'",']','}','112','{','a',':',"'str'",'b',':','[','912','[','5656','33',']',']','}',']'];
    
    let answer;

    before('create Answer',()=>{
        answer = [
            { type: 'array', value: '[', child: [] },
            { type: 'string', value: '1a3', child: [] },
            { type: 'object', value: '{', child: [] },
            { key :'easy', child:[] },
            { type: 'object', value: ':', child: [] },
            { type: 'array', value: '[', child: [] },
            { type: 'string', value: 'hello', child: [] },
            { type: 'object', value: '{', child: [] },
            { key :'a', child:[] },
            { type: 'object', value: ':', child: [] },
            { type: 'string', value: 'a', child: [] },
            { type: 'object', value: '}', child: [] },
            { type: 'string', value: 'world', child: [] },
            { type: 'array', value: ']', child: [] },
            { type: 'object', value: '}', child: [] },
            { type: 'number', value: 112, child: [] },
            { type: 'object', value: '{', child: [] },
            { key :'a', child:[] },
            { type: 'object', value: ':', child: [] },
            { type: 'string', value: 'str', child: [] },
            { key :'b', child:[] },
            { type: 'object', value: ':', child: [] },
            { type: 'array', value: '[', child: [] },
            { type: 'number', value: 912, child: [] },
            { type: 'array', value: '[', child: [] },
            { type: 'number', value: 5656, child: [] },
            { type: 'number', value: 33, child: [] },
            { type: 'array', value: ']', child: [] },
            { type: 'array', value: ']', child: [] },
            { type: 'object', value: '}', child: [] },
            { type: 'array', value: ']', child: [] }]
    });

    it('should return lexed Array(object)',()=>{
        assert.deepEqual(lexer.createNode(input),answer)
    })
})