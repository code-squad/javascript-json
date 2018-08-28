class ArrayParser {
  constructor(targetStr) {
    this.targetStr = targetStr;
    this.result;
  }
}

const str1 = '[123, 22, 33]';
const str2 = '[123,[22],33, [1,2,3,4,5]]';
const str3 = '[123,[22,23,[11,[112233],112],55],33]';

const arrayParser = new ArrayParser(str3);