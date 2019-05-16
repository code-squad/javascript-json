const ArrayParser = require('./arrayParser');
const parserApp = new ArrayParser();
const input = "['123',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]"

try {
    parserApp.getString(input);
    parserApp.runApp();
} catch (e) {
    console.log(e);
}