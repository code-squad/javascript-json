class Tokenizer {
  addCommaToBraket(inputStr) {
    inputStr = inputStr.replace(/\[/g, "[,");
    inputStr = inputStr.replace(/\]/g, ",]");
    return inputStr;
  }

  addCommaToBrace(inputStr) {
    inputStr = inputStr.replace(/\{/g, "{,");
    inputStr = inputStr.replace(/\}/g, ",}");
    return inputStr;
  }

  addCommaToColon(inputStr) {
    inputStr = inputStr.replace(/\:/g, ":,");
    return inputStr;
  }

  removeWhiteSpace(inputStr) {
    return inputStr.replace(/\s/g, "");
  }

  splitInputStr(inputStr) {
    return inputStr.split(",");
  }
}

module.exports = Tokenizer;
