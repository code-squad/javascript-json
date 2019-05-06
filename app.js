const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const Parser = require('./parser');
const keyword = require('./keyword');

// const str1 = "['1a'3', 1a3, '12, [null,false,['11',[112233],112],55, '99'],33, true]";
// const str2 = "['1a'3', '12, [null,false,['11',[112233],112],55, '99'],33, true]";
const str3 = "['1a'3', [null,false,['11',[112233],112],55, '99'],33, true]";
// const str4 = "['1a3', [null,false,['11',[112233],112],55, '99'],33, true]";

const tokenizer = new Tokenizer({ rawString: str3 });
const parser = new Parser({ lexer: new Lexer({ keyword }), tokens: tokenizer.tokenize() });

try {
  const result = parser.parse();
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.log(error.message);
}
