const {log, time, timeEnd, group, groupEnd} = console;
const Stack = require('./Stack');
const statisticsStack = new Stack();

function Statistics() {
  this.successCnt = 0;
  this.failCnt = 0;
}

const printStatistics = () => {
  const statistics = statisticsStack.pop();
  log(`\n${statistics.successCnt} passing.`);
  log(`${statistics.failCnt} failing.`);
}

const test = {
  describe(title, func) {
    const statistics = new Statistics();
    statisticsStack.push(statistics);
    group();
    log(`\n# ${title}`);
    func();
    printStatistics();
    groupEnd();
  },

  it(testTitle, testCode) {
    group();
    log(`✓ ${testTitle}`);
    time("test completed");
    try {
      testCode();
      statisticsStack.top().successCnt += 1;
    } catch (error) {
      statisticsStack.top().failCnt += 1;
      // log(error);
    }
    timeEnd("test completed");
    groupEnd();
  },
}

module.exports = test;