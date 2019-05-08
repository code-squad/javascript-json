const util = require("./util");
const tokenize = (string) => {
    string = util.deleteFirstLastChar(string);
    return string.replace(/\[/g, "\[,")
                 .replace(/\]/g, ",]")
                 .split(",")
                 .map(v => v.trim());
}
module.exports = tokenize;