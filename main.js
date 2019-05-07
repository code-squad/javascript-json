const tokenizer = require("./arrayTokenizer.js");
const arrayParser = require("./arrayParser.js");

const str = "['1a3',[null,false,['11',[112233],112],55,'99'],33,true]";
const getTokens = tokenizer(str);
const trylexerAndArryParse = new arrayParser(getTokens);
if(trylexerAndArryParse.check_Balanced_Bracket(getTokens)) {
    let array_Parse_Result = trylexerAndArryParse.executor();
    console.log(JSON.stringify(array_Parse_Result, null, 2));
} 