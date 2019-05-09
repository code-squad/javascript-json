const Parser = require("./Parser");
const test = require("./test/test");
const {testingData, result} = require("./test/testingData");
const assert = require("assert");
const parser = new Parser();

const TEST_CODE_ENABLE = true;

if(!TEST_CODE_ENABLE) {
  const data = parser.getJson("[ '123', {easy : ['he llo', {a:'a'}, 'world'] } , { a :123, a:'str', b:[ 912,[5656,33], {key : 'innervalue', newkeys: [1,2,3,4,5]} ] } ]");
  console.log(data);
} else {
  test.describe("Parser test", function() {

    test.describe("Correct examples test", () => {

      for(let props in testingData) {
        test.it("should return correct parsed data!", () => {
          assert.deepStrictEqual(parser.getJson(testingData[props]), result[props]);
        });
      }
    });

    test.describe("Incorrect examples test", () => {
    });
  });
}
