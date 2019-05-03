function arrayParser(tokens) {

    let ast = {
        type: 'array',
        child: []
    };

    tokens.forEach(function(element) {
      if(element.type === 'number') {
          ast.child.push(element);
      }
    })

    return ast;
  }

module.exports = arrayParser;