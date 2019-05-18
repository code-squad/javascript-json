const util = {
  toggleBool = value => {
    return value ? false : true;
  }
  
  isEmptry = str => {
    return str.length === 0;
  }
};

module.exports = util;
