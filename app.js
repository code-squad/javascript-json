const ArrayParser = require('./arrayParser');
const parserApp = new ArrayParser();
const input = "['13', 23,{easy : ['hello', {a:'a'}, 'world']}]"

try {
    parserApp.getString(input);
    parserApp.runApp();
} catch (e) {
    console.log(e);
}


//"['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]"