function parser(tokens) {

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
  
      if (token.type === 'string') {
        index++;
        return {
          type: 'String',
          value: token.value,
          child: []
        };
      }
  
      // Next we're going to look for CallExpressions. We start this off when we
      // encounter an open parenthesis.
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
          // we'll call the `walk` function which will return a `node` and we'll
          // push it into our `node.params`.
          node.child.push(walk());
          token = tokens[index];
        }
  
        // Finally we will increment `index` one last time to skip the closing
        // parenthesis.
        index++;
  
        // And return the node.
        return node;
      }
  
      // Again, if we haven't recognized the token type by now we're going to
      // throw an error.
      throw new TypeError(token.type);
    }
  
    // Now, we're going to create our AST which will have a root which is a
    // `Program` node.
    let ast = {
      type: 'Array',
      child: [],
    };
  
    while (index < tokens.length) {
      ast.body.push(walk());
    }
  
    // At the end of our parser we'll return the AST.
    return ast;
  }
  module.exports = parser;