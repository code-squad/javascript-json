const Parser = require('../Parser');
const assert = require('assert');

describe('Parser Test', () => {
    const parser = new Parser();
    const input = [
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
        { type: 'array', value: ']', child: [] }
    ]

    let answer;

    before('create answer', () => {
        answer = {
            type: 'array',
            child:
                [{ type: 'string', value: '1a3', child: [] },
                { type: 'object', child: [
                            {key: 'easy', child:[ 
                                { type: 'array',
                                  child: [
                                    { type: 'string', value: 'hello', child: [] },
                                    { type: 'object', child: [
                                                {key: 'a', child: [
                                                    {type: 'string', value: 'a', child: []}]
                                            }]
                                    },
                                    { type: 'string', value: 'world', child: [] },
                                ]}
                            ]}
                ]},
                { type: 'number', value: 112, child: [] },
                { type: 'object', child: [
                    { key: 'a' ,child:[
                        {type:'string', value:'str' , child: []}]
                    },
                    { key: 'b',child: [
                        {type:'array', child: [
                            {type: 'number', value:912 , child:[]},
                            {type: 'array', child:[
                                {type:'number', value:5656 , child:[]},
                                { type: 'number', value: 33, child: [] },
                            ]}
                        ]}
                    ]}]
                }
            ]}
    });

    it('should return ParseTree', () => {
        assert.deepEqual(parser.makeTree(input), answer);
    })
})