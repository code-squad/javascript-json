const checkErrors = require('./error.js');
const stackControl = require('./stack.js');
const separators = require('./separators.js');


class arrayParser {
  tokenizer(inputString) {
    //Error Check
    checkErrors.doesDataExist(inputString);
    const tokenizedItems = [];
    const splitLetters = inputString.split('');
    let data = "";
    splitLetters.forEach( letter => {
      if(letter === separators.comma) {
        if(data !== "") {
          data = data.trim();
          tokenizedItems.push(data);
          data = "";
        }
      } else if(parserUtils.separatorChecker(letter)) {
        if (data !== "") {
          data = data.trim();
          tokenizedItems.push(data, letter)
          data = "";
        } else {
          tokenizedItems.push(letter)
        }
      } else {
        data += letter;
      }
    })
    // Error Check
    checkErrors.dataValidator(tokenizedItems);
    return tokenizedItems;
  }

  lexer(tokenizedItems) {
    // Error Check
    checkErrors.stringValidator(tokenizedItems);
    const lexedItems = [];
    tokenizedItems.forEach(token => {
      // check if array starts
      const typeOfLetter = parserUtils.getType(token);
      if(parserUtils.separatorChecker(token)) {
        lexedItems.push(token);
      } else if(typeOfLetter === 'number') {
        lexedItems.push([typeOfLetter, Number(token)])
      } else {
        lexedItems.push([typeOfLetter, token])
      }
    });
    // Error Check
    checkErrors.typeValidator(lexedItems);
    return lexedItems;
  }
  
  parser(lexedItems) {
    const lexedData = lexedItems[0];
    if(lexedData === undefined) return;
    lexedItems.shift();
    const topnotch = {
      'type': 'Array',
      'child': []
    };
    if(lexedData === separators.closeArray) {
      const parsedObjByArr = stackControl.pop();
      if(stackControl.countStack() === 0) {
        topnotch.child.push(parsedObjByArr);
        return
      }
      stackControl.appendInChild(parsedObjByArr);
      this.parser(lexedItems)
    } else if (lexedData === separators.openArray) {
      stackControl.appendInStack(topnotch)
      this.parser(lexedItems)
    } else {
      const parsedSingleObj = parserUtils.getObj(lexedData)
      stackControl.appendInChild(parsedSingleObj)
      this.parser(lexedItems)
    }
    return topnotch;
  }

  getParsedJson(inputString) {
    const tokenizedItems = this.tokenizer(inputString);
    const lexedItems = this.lexer(tokenizedItems);
    const parsedObj = this.parser(lexedItems)
    const resultObj = JSON.stringify(parsedObj, null, 1)
    console.log(resultObj);
  }
}

const parserUtils = {
  separatorChecker: function(expectedSeperator) {
    for(const key in separators) {
      if (separators[key] === expectedSeperator) return true;
    }
    return false;
  },

  getObj: function(lexedData) {
    const [type, value] = lexedData;
    return {
      type,
      value,
      child: []
    }
  },

  getType: function(thingsToCheck) {
    if (Array.isArray(thingsToCheck)) return "array"
    if (thingsToCheck === "true" || thingsToCheck === "false") return "boolean"
    if (thingsToCheck === "null") return 'object'
    if (isNaN(thingsToCheck * 1)) return 'string'
    if (!isNaN(Number(thingsToCheck * 1))) return 'number'
  }
}

const arrParser = new arrayParser()

arrParser.getParsedJson("['asd',[null,false,['11',[112233],112],55, '99'],33, true]");
