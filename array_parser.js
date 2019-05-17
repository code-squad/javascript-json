const msgObj = module.require('./error_message');

class ArrayParser {
	constructor() {
		this.parserStack = [];
		this.quoteArr = ["'", '"'];
		this.bracketArr = ['[', ']'];
		this.commaAndSpaceArr = [',', ' '];
	}

	tokenizer(inputStr) {
		const stack = [];
		const tokens = [];
		let makeStr = '';
		let doubleQuotes = false;

		for (let char of inputStr) {
			if (stack.length === 0) {
				if (this.bracketArr.includes(char) || this.commaAndSpaceArr.includes(char)) {
					if (makeStr !== '') {
						tokens.push(makeStr);
						makeStr = '';
					}
					tokens.push(char);
				} else if (this.quoteArr.includes(char)) {
					makeStr += char;
					stack.push(char);
				} else {
					makeStr += char;
				}
			} else {
				if (this.quoteArr.includes(char)) {
					makeStr += char;
					doubleQuotes = true;
				} else if ((this.commaAndSpaceArr.includes(char) || this.bracketArr.includes(char)) && doubleQuotes === true) {
					tokens.push(makeStr);
					tokens.push(char);
					stack.pop();
					makeStr = '';
					doubleQuotes = false;
				} else {
					makeStr += char;
					doubleQuotes = false;
				}
			}
		}

		return tokens;
	}

	lexer(tokens) {
		const lexerArr = [];

		for (let token of tokens) {
			if (!this.commaAndSpaceArr.includes(token)) {
				lexerArr.push(this.getTypeAndValue(token));
			}
		}
		return lexerArr;
	}

	parser(lexerArr) {
		const parserArr = [];

		while (lexerArr.length) {
			const lexeredData = lexerArr.shift();

			if (lexeredData.type === 'leftBracket') {
				this.parserStack.push('[');
				parserArr.push({ type: 'array', child: this.parser(lexerArr) });
			} else if (lexeredData.type === 'rightBracket') {
				if (this.parserStack.length > 0) {
					this.parserStack.pop();
					return parserArr;
				}
				throw new Error(`${msgObj.INVALID_BRACKET}`);
			} else {
				if (this.parserStack.length > 0) {
					parserArr.push(lexeredData);
				} else {
					throw new Error(`${msgObj.INVALID_BRACKET}`);
				}
			}
		}
		return parserArr;
	}

	arrayParser(inputStr) {
		try {
			console.log(JSON.stringify(this.parser(this.lexer(this.tokenizer(inputStr))), null, 2));
		} catch (error) {
			console.log(error.message);
		}
	}

	getTypeAndValue(token) {
		if (!isNaN(token)) {
			return { type: 'number', value: Number(token) };
		}
		if (token === '[') {
			return { type: 'leftBracket', value: token };
		}
		if (token === ']') {
			return { type: 'rightBracket', value: token };
		}

		if (token.includes('"') || token.includes("'")) {
			if (this.isValidString(token)) {
				return { type: 'string', value: token };
			}
			throw new Error(`${token}${msgObj.INVALID_STRING}`);
		}

		const lowerStrToken = token.toLowerCase();
		if (lowerStrToken === 'true') {
			return { type: 'boolean', value: token };
		}
		if (lowerStrToken === 'false') {
			return { type: 'boolean', value: token };
		}
		if (lowerStrToken === 'null') {
			return { type: 'null', value: token };
		}
		throw new Error(`${token}${msgObj.INVALID_TYPE}`);
	}

	isValidString(token) {
		const tokenArr = [...token];
		const filteredQuotes = tokenArr.filter(char => this.quoteArr.includes(char));

		if (filteredQuotes.length !== 2) return false;
		if (!(this.quoteArr.includes(token[0]) && this.quoteArr.includes(token[token.length - 1]))) return false;
		return true;
	}
}

const inputStr = '[1, true, "ab,c", ["4b", 55]]';
const myArrayParser = new ArrayParser();
myArrayParser.arrayParser(inputStr);
