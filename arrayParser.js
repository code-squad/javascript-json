const tokenizer = require('./tokenizer');
const parser = require('./parser');

const  arrayParser = (input) => {
    const tokens = tokenizer(input);
    const resultOfParse = parser(tokens); 
    return resultOfParse
}

arrayParser("[123, 22, 33]") 