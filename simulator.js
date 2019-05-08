const tokenizer = require("./arrayTokenizer.js");
const arrayParser = require("./arrayParser.js");
const errorCheck = require("./errorCheck");

const errorChecker = new errorCheck();

const str = "['1a3',[null,false,['11',[112233],112],55,'99'],33,true]";
const getTokens = tokenizer(str);

const lexer_and_Parser = new arrayParser(getTokens);

if(errorChecker.check_Balanced_Bracket(getTokens)) {
     let array_Parse_Result = lexer_and_Parser.executor();
     console.log(array_Parse_Result);
     console.log(JSON.stringify(array_Parse_Result, null, 2)); 
} 
