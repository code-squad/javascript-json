const Parser = require("./Parser");
const test = require("./test/test");
const {data, result} = require("./test/testingData");
const assert = require("assert");
const parser = new Parser();

test.describe("Parser test", function() {

  test.describe("Correct examples test", function() {
    test.it("should return correct parsed data!", () => {
      assert.deepStrictEqual(parser.getJson(data[1]), result[1]);
    });

    test.it("should return correct parsed data!", () => {
      assert.deepStrictEqual(parser.getJson(data[2]), result[2]);
    });

    test.it("should return correct parsed data!", () => {
      assert.deepStrictEqual(parser.getJson(data[3]), result[3]);
    });
  });

  test.describe("Incorrect examples test", function() {
  });
});