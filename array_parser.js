const msgObj = module.require('./error_message');

class ArrayParser {
	constructor() {
		this.stack = [];
	}

	tokenizer(inputStr) {
		const stack = [];
		const tokens = [];
		let makeStr = '';
		let doubleQuotes = false;

		for (let char of inputStr) {
			if (stack.length === 0) {
				if (char === '[' || char === ']' || char === ',' || char === ' ') {
					if (makeStr !== '') {
						tokens.push(makeStr);
						makeStr = '';
					}
					tokens.push(char);
				} else if (char === '"' || char === "'") {
					makeStr += char;
					stack.push(char);
				} else {
					makeStr += char;
				}
			} else {
				if (char === '"' || char === "'") {
					makeStr += char;
					doubleQuotes = true;
				} else if ((char === ',' || char === ']') && doubleQuotes === true) {
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
			if (
				!(
					(token[0] === '"' || token[0] === "'") &&
					(token[token.length - 1] === '"' || token[token.length - 1] === "'")
				)
			)
				throw new Error(`${token} 은(는) 올바른 문자열이 아닙니다.`);
		} else {
			return { type: 'string', value: token };
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
	lexer(tokens) {
		const lexerArr = [];

		for (let token of tokens) {
			if (token !== ',' && token !== ' ') {
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
				this.stack.push('[');
				parserArr.push({ type: 'array', child: this.parser(lexerArr) });
			} else if (lexeredData.type === 'rightBracket') {
				if (this.stack.length < 1) throw new Error(`${msgObj.INVALID_BRACKET}`);
				this.stack.pop();
				return parserArr;
			} else {
				if (this.stack.length === 0) {
					throw new Error(`${msgObj.INVALID_BRACKET}`);
				} else {
					parserArr.push(lexeredData);
				}
			}
		}
		return parserArr;
	}
	arrayParser(inputStr) {
		try {
			const tokens = this.tokenizer(inputStr);
			const lexerArr = this.lexer(tokens);
			const parserArr = this.parser(lexerArr);
		} catch (error) {
			console.log(error.message);
		}
	}
}

const inputStr = '[1, true, "ab,c", ["4"b"]]';
const myArrayParser = new ArrayParser();
myArrayParser.arrayParser(inputStr);
