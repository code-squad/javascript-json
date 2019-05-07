const jsonStr = "[123, 22, 33]";

function ArrayParser() {
    this.tokenizer(jsonStr);
}

ArrayParser.prototype.tokenizer = function(str) {
    const token = str.split(',').map(el => el.trim()); 
    return token;
}

ArrayParser.prototype.lexer = function() {
    const token = this.tokenizer(jsonStr);
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

ArrayParser.prototype.parser = function() {
    const [dataType, tokenList] = this.lexer();
    const parseArr = [];

    tokenList.filter(ele => {
        if(ele.match(/[0-9]/g)){
            parseArr.push({'type':'number', 'value':ele, child:[]});
        }
    })

    this.parseObj.type = dataType;
    this.parseObj.child = parseArr;
}

ArrayParser.prototype.showParsedResult = function() {
   
}