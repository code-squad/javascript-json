class ArrayParser {
	constructor() {
		this.result = { type: '', child: [] };
	}

	tokenizer(inputStr) {
		const stack = [];
		const token = [];
		let makeStr = '';

		for (let char of inputStr) {
			if (stack.length === 0) {
				if (char === "'" || char === '"') {
					stack.push(char);
				} else if (char !== ' ') {
					token.push(char);
				}
			} else {
				if (char === "'" || char === '"') {
					token.push(makeStr);
					makeStr = '';
					stack.pop();
				} else {
					makeStr += char;
				}
			}
		}

		return token;
	}

	arrayParser(inputStr) {
		console.log(this.tokenizer(inputStr));
	}
}

const inputStr = '[1, 2, "a,    b"]';
const myArrayParser = new ArrayParser();
myArrayParser.arrayParser(inputStr);
