const assert = require('assert');
const {log} = console;
const {time, timeEnd} = console;

const statistics = {
  successCnt: 0,
  failCnt: 0,
  ignoreCnt: 0,
  isAllPassing: false
}

const test = {
  it(testTitle, testCode) {
    //TODO: test title 출력 및 testCode 실행.
    log(`✓ ${testTitle}`);
    time("test pass");
    testCode();
    timeEnd("test pass");
  },

  all() {
    //TODO: testList 객체에 등록된 모든 테스트를 진행한다. 진행하면서 통계를 기록한다.
    //! 모든 테스트를 진행 후 결과를 보여주어야 하므로 assert나 throw를 사용하지 않는다.
  },

  showResult() {
    //TODO: 직전 테스트 결과에 대한 통계를 출력한다.
    //? passCnt : 테스트 성공 횟수
    //? failCnt : 테스트 실패 횟수
    //? ignoreCnt : 테스트 진행 안한 횟수 (testList에서 매칭이 안된다거나 하는 이유 등)
    log(`result: ${testResult} (success: ${passCnt}, fail: ${failCnt}, ignore: ${ignoreCnt})`);
  }
}

module.exports = test;