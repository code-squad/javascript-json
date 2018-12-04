const sum = (a, b) => a + b;
const equal = (a, b) => {
	if (a === b) return true;
	return false;
};
const test = function (text, fn) {
	let result = fn()
	console.log(`${text} : ${result}`);
};
let expect = function (expectValue) {
	let result = {};
	result.expectValue = expectValue;
	result.toBe = function (val) {
		if (equal(expectValue, val)) return true;
		return `${false} (결과값 : ${val} , 기대값 : ${expectValue})`;
	}
	return result;
};
test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", function () {
	let a = 10;
	let b = 30;
	const result = sum(a, b);
	return expect(40).toBe(result);
});

