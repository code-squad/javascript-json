const separators = require("./separators");

module.exports = letter => {
  for (let separator of Object.values(separators)) {
    if (letter === separator) return true;
  }
  return false;
}