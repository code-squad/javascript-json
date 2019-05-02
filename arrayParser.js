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
    let result = {};
    let resultPtr = result;
    let isPtrArray = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      switch (token.type) {
        case Types.ArrayStart:
          let beforePtr = resultPtr;
          if(isPtrArray){
            resultPtr.push(new Object({type: Types.ArrayStart, child: []}));
            beforePtr = resultPtr;
            resultPtr = resultPtr[resultPtr.length - 1].child;
          } else {
            resultPtr.type = Types.ArrayStart;
            resultPtr.child = [];
            beforePtr = resultPtr;
            resultPtr = resultPtr.child;
            isPtrArray = true;
          }
          stack.push({type: Types.ArrayStart, beforePtr});
          break;
        case Types.ArrayEnd:
          if(stack.top().type !== Types.ArrayStart){
            throw new Error('Parsing failed.');
          }
          resultPtr = stack.top().beforePtr;
          stack.pop();
          break;
        case Types.Number:
          if(!isPtrArray){
            throw new Error('Left brace not found.');
          }
          resultPtr.push({type: Types.Number, value: token.value});
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
