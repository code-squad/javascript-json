class ArrayParser {
	constructor() {
		this.result = { type: '', child: [] };
	}

	tokenizer(inputStr) {
		const stack = [];
		const tokens = [];
		let makeStr = '';

		for (let char of inputStr) {
			if (stack.length === 0) {
				if (char === "'" || char === '"') {
					stack.push(char);
				} else if (char !== ' ') {
					tokens.push(char);
				}
			} else {
				if (char === "'" || char === '"') {
					tokens.push(makeStr);
					makeStr = '';
					stack.pop();
				} else {
					makeStr += char;
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
		} else {
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
			return { type: 'string', value: token };
		}
	}

	lexer(tokens) {
		const lexerArr = [];

		for (let token of tokens) {
			if (token !== ',') {
				lexerArr.push(this.getTypeAndValue(token));
			}
		}

		return lexerArr;
	}

	arrayParser(inputStr) {
		const tokens = this.tokenizer(inputStr);
		console.log(this.lexer(tokens));
	}
}

const inputStr = '[1, 2, "a,    b"]';
const myArrayParser = new ArrayParser();
myArrayParser.arrayParser(inputStr);
