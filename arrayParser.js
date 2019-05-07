class ArrayParser {
	constructor() {
		this.result = { type: '', value: '', child: [] };
	}

	tokenizer(str) {
		const strToken = str
			.replace(/\s/g, '')
			.replace(/\[/g, '[,')
			.replace(/\]/g, ',]')
			.split(',');

		return strToken;
	}

	arrayParser(str) {
		const strToken = this.tokenizer(str);
		return strToken;
	}
}

const str = '[123, ["22", 55], 33]';
const myArrayParser = new ArrayParser();
console.log(myArrayParser.arrayParser(str));
