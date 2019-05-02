const Tokenizer = require('./tokenizer');
const Stack = require('./ds/stack');
const Types = require('./type/types');

class ArrayParser {
  constructor(text){
    this.tokenizer = new Tokenizer(text);
  }

  requestTokens(){
    return this.tokenizer.getTokens();
  }

  analysis(){
    const tokens = this.requestTokens();
    const stack = new Stack();
    const result = {};
    let resultPtr = result;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      switch (token.type) {
        case Types.ArrayStart:
          resultPtr.type = Types.ArrayStart;
          resultPtr.child = [];
          resultPtr = resultPtr.child;
          stack.push(token);
          break;
        case Types.ArrayEnd:
          if(stack.top().type !== Types.ArrayStart){
            throw new Error('Parsing failed.');
          }
          stack.pop();
          break;
        case Types.Number:
          if(!Array.isArray(resultPtr)){
            throw new Error('Left brace not found.');
          }
          resultPtr.push({type: Types.Number, value: token.value, child: []});
          break;
        default:
          throw new Error('Unexpected Error occured');
      }
    }

    if(!stack.empty()){
      throw new Error('Right brace not found.');
    }

    return result;
  }
}

module.exports = ArrayParser;