const parser = (tokens) => {

    let index = 0;
  
    function walk() {
      let token = tokens[index];
      if (token.type === 'number') {
        index++;
        return {
          type: 'Number',
          value: token.value,
          child: []
        };
      }
      //TODO STPE 6-2  
      if (token.type === 'string') {
        index++;
        return {
          type: 'String',
          value: token.value,
          child: []
        };
      }
      
      if (token.type === 'braket' &&token.value === '[') {
        token = tokens[++index];
  
        const node = {
          type: 'Array',
          child: [],
        };
  
        token = tokens[++index];

        while (
          (token.type !== 'braket') ||
          (token.type === 'braket' && token.value !== ']')
        ) {
          node.child.push(walk());
          token = tokens[index];
        }
        index++;
        return node;
      }
  
      throw new TypeError(token.type);
    }
  
    const resultOfParse = {
      type: 'Array',
      child: [],
    };
  
    while (index < tokens.length) {
      resultOfParse.child.push(walk());
    }
    return resultOfParse;
  }

  module.exports = parser;