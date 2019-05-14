const tc = require("./typeChecker");
let tempStr = "";
const makeToken = (tokens ,char, index, arrOfChar) => {
    if(tc.isSperator(char)) {
        tempStr = "";
        return [...tokens, char];
    }
    if(tc.isSperator(arrOfChar[index+1])){
        tempStr += char;
        return [...tokens, tempStr.trim()]
    }
    tempStr += char;
    return tokens; 
}
const tokenize = (str) => {
   return str.split("").reduce(makeToken, [])
}

module.exports = tokenize;