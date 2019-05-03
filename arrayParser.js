class ArrayParser{
  constructor () {

  }
  arrayParse(input){
    input = input.trim()
    let result = {}
    
    if (input[0] === '[' && input[input.length-1] === ']') {      // array
      const tokens = input.slice(1,input.length-1).split(',');
      result = { type: 'array', child: [] };
      
      tokens.forEach(element => {
        result.child.push(this.arrayParse(element))
      });
      return result
    }
    
    if (!isNaN(input)) {                         //number value 
      result = { type: 'number', value: input }
      return result
    }

    throw new Error('Invalid Token')
  }
}

module.exports = ArrayParser