const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const Parser = require('./parser');
const keyword = require('./keyword');
const messageObj = require('./message');

const str = "['1a3', [null,false,['11',[112233],112],55, '99'],33, true]";

const tokenizer = new Tokenizer({ rawString: str });
const tokens = tokenizer.tokenize();
const lexer = new Lexer({ keyword, messageObj, tokens });
const lexedData = lexer.lex();
const parser = new Parser({ lexedData });

try {
  const result = parser.parse();
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.log(error.message);
}
