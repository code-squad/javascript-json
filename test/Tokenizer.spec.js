const Tokenizer = require('../Tokenizer')
const assert = require('assert');

describe('Tokenizer test',()=>{
    const tokenizer = new Tokenizer();

    const input = "['1a3',{easy: ['hello' ,{a:'a'},'world']},112,{a:'str', b:[912,[5656,33]]}]"
    let answer;
    // 이 테스트코드가 모든 경우를 다 통과하는 테스트 케이스인가? 
    // 꼼꼼한 에러처리의 어려움 '[abc]','''  
    before('create Answer',()=>{
        answer = ['[', "'1a3'", '{', 'easy', ':', '[', "'hello'", '{', 'a',':',"'a'",'}',"'world'",']','}','112','{','a',':',"'str'",'b',':','[','912','[','5656','33',']',']','}',']']
    });

    it('should return tokenized Array',()=>{
        assert.deepEqual(tokenizer.cutInput(input),answer)
    })


})