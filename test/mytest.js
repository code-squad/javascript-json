'use strict';

exports.test = function (testName, testFunc) {
  let testResult = 'OK';
  try {
    testFunc();
  }
  catch (err) {
    testResult = err;
  }
  finally {
    console.log(`${testName} : ${testResult}`);
  }
}

exports.expect = function (expectedVal) {
  return {
    toBe(testVal) {
      if (expectedVal !== testVal) throw 'FAIL';
    }
  }
}