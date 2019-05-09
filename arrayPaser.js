function ParsingData ( type ) {
    this.type = type;
    this.child = [];
    }

const parsingData = new ParsingData ()

function tokenizer (input) {
    let type = input[0]
    let tokenData = input.substring(1, input.length-1).split(',');
    lexer (type, tokenData);
}

function lexer (type, tokenData) {
    let lexedData = tokenData.map(function(v) {
        return parseInt(v)
    })
    parser(type, lexedData);
}

function parser (type, lexedData) {
    if ( type === '[') {
        parsingData.type = 'array'
    } else if ( type === '{') {
        parsingData.type = 'object'
    }
    lexedData.forEach(function(v) {
        parsingData.child.push({type :typeof v, value : v, child : []})
    })
    return parsingData;
}

function ArrayPaser (input) {
    tokenizer(input);
    return parsingData;
}

const str = "[123, 22, 33]";
const result = ArrayPaser (str);
console.log(JSON.stringify(result, null, 2)); 