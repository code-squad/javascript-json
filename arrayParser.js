const jsonStr = "[123, 22, 33]";

function ArrayParser(jsonStr) {
    this.jsonStr = jsonStr;
}

ArrayParser.prototype.tokenizer = function() {
    const token = this.jsonStr.split(',').map(el => el.trim()); 
    return token;
}

ArrayParser.prototype.lexer = function(token) {
    let dataType = null;

    token.forEach(v => {
        if(v.indexOf('[') !== -1){
            dataType = 'array';
        } else if(v.indexOf('{') !== -1){
            dataType = 'object'
        }
    })

    const tokenList = token.map(v => v.replace(/(\[)|(\])|(\{)|(\})|/g, ''));

    return [dataType, tokenList];
}

ArrayParser.prototype.parse = function(lexing) {
    const [dataType, tokenList] = lexing;
    const parseArr = [];

    tokenList.filter(ele => ele.match(/[0-9]/g)).map(ele => parseArr.push({'type':'number', 'value':ele, child:[]}));

    return parseObj = {
        'type' : dataType,
        'child' : parseArr
    }
}

/* 실행 */
ArrayParser.prototype.run = function() {
    const token = this.tokenizer();
    const lexing = this.lexer(token);
    const parser = this.parse(lexing);
    
    return parser;
}

const arrayParser = new ArrayParser(jsonStr);
const result = arrayParser.run();
console.log(JSON.stringify(result, null, 10));