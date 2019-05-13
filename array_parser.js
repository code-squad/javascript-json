class ArrayParser {
	constructor() {
		this.stack = [];
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

	parser(lexerArr) {
		const parserArr = [];

		while (lexerArr.length) {
			const lexeredData = lexerArr.shift();

			if (lexeredData.type === 'leftBracket') {
				this.stack.push('[');
				parserArr.push({ type: 'array', child: this.parser(lexerArr) });
			} else if (lexeredData.type === 'rightBracket') {
				this.stack.pop();
				return parserArr;
			} else {
				if (this.stack.length === 0) {
					throw new Error('괄호 안맞음');
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
			return this.parser(lexerArr);
		} catch (error) {
			console.log(error.message);
		}
	}
}

const inputStr = '[1, "TRUE", ["false", "stririring"], "null", 3, [4]]';
const myArrayParser = new ArrayParser();
console.log(JSON.stringify(myArrayParser.arrayParser(inputStr), null, 2));
