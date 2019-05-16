const Token = require("./token.js");

class Lexer {
  isCorrectStr(element) {
    element = element.slice(1, element.length - 1);

    if (element.includes("'")) {
      return false;
    }
    return true;
  }

  isStr(element) {
    if (element.startsWith("'") && element.endsWith("'")) {
      if (this.isCorrectStr(element)) {
        return true;
      } else {
        throw new Error(`${element}는 올바르지 않은 문자열입니다.`);
      }
    }
  }

  isObjKey(element) {
    return element[element.length - 1] === ":";
  }

  getKeydatafromObjKey(element) {
    const objKey = element.slice(0, element.length - 1);
    return objKey;
  }

  makeToken(tokenizeredData) {
    const typeMap = {
      "[": function() {
        return new Token({ type: "array" });
      },
      "]": function() {
        return new Token({ type: "array-end" });
      },
      null: function() {
        return new Token({ type: "null" });
      },
      true: function() {
        return new Token({ type: "boolean", value: true });
      },
      false: function() {
        return new Token({ type: "boolean", value: false });
      },
      "{": function() {
        return new Token({ type: "object" });
      },
      "}": function() {
        return new Token({ type: "object-end" });
      }
    };

    let objKey;

    const lexeredData = tokenizeredData.map(element => {
      if (Object.keys(typeMap).includes(element)) {
        return typeMap[element]();
      }
      if (this.isObjKey(element)) {
        objKey = this.getKeydatafromObjKey(element);
        return new Token({ type: "object-key", key: objKey });
      }
      if (this.isStr(element)) {
        return new Token({ type: "string", value: element });
      }
      if (isFinite(element)) {
        return new Token({ type: "number", value: element });
      } else {
        throw new Error(`${element}는 알 수 없는 타입의 토큰입니다.`);
      }
    });
    return lexeredData;
  }
}

module.exports = Lexer;
