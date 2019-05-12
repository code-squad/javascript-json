const assert = require('assert');

const Analyst = require('../analyst');

describe('Analyst test', () => {
    const analyst = new Analyst();
    const parseTree = {
        key: undefined, type: 'array', value: undefined, child: [{
            key: undefined, type: 'number', value: '123', child: []
        },
        {
            key: undefined, type: 'array', value: undefined, child: [{
                key: undefined, type: 'boolean', value: 'true', child: []
            },
            {
                key: undefined, type: 'string', value: '"abc"', child: []
            }]
        },
        {
            key: undefined, type: 'object', value: undefined, child: [{
                key: 'key', type: 'number', value: '12345', child: []
            }]
        }]
    }
    let answer;
    let typeList;
    let counts;

    describe('getAllNodeTypes test', () => {
        before('', () => {
            answer = ['number', 'array', 'boolean', 'string', 'object', 'number'];
        })
        it('should be Ok', () => {
            assert.deepEqual(analyst.getAllNodeTypes(parseTree), answer);
        })
    })

    describe('countTypes test', () => {
        before('', () => {
            typeList = answer;
            answer = { array: 1, object: 1, number: 2, string: 1, boolean: 1, null: 0 };
        })
        it('should be Ok', () => {
            assert.deepEqual(analyst.countTypes(typeList), answer)
        })
    })

    describe('printCounts test', () => {
        before('', () => {
            counts = answer;
            answer = 'array : 1개,\n' +
                'object : 1개,\n' +
                'number : 2개,\n' +
                'string : 1개,\n' +
                'boolean : 1개,\n' +
                'null : 0개';
        })
        it('리턴없는 메소드라 fail뜸(console.log)', () => {
            assert.equal(analyst.printCounts(counts), answer);
        })
    })
})