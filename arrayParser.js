class ArrayParser {
	constructor(defaultResult = { type: '', child: [] }) {
		this.result = defaultResult;
	}

	printResult() {
		console.log(this.result);
	}
}

const str = '[123, 22, 33]';
const myArrayParser = new ArrayParser();
myArrayParser.printResult();
