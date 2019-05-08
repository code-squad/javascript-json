const checker = require('./getType');
const checkErrors = require('./error.js');
const stackControl = require('./stack.js');
const separators = require('./separators.js');


class arrayParser {
  tokenizer(inputString) {
    const tokenizedItems = [];
    const splitLetters = inputString.split('');
    let data = "";
    splitLetters.forEach( letter => {
      if(letter === separators.comma) {
        tokenizedItems.push(data);
        data = "";
      } else if(this.separatorChecker(letter)) {
        data !== "" ? tokenizedItems.push(data, letter) : tokenizedItems.push(letter)
      } else {
        if(letter !== ' ') data += letter;
      }
    })
    // console.log(tokenizedItems)
    return tokenizedItems;
  }

  lexer(tokenizedItems) {
    checkErrors.stringValidator(tokenizedItems);
    const lexedItems = [];
    tokenizedItems.forEach(token => {
      // check if array starts
      const typeOfLetter = checker.getType(token);
      if(this.separatorChecker(token)) {
        lexedItems.push(token);
      } else if(typeOfLetter === 'number') {
        lexedItems.push([typeOfLetter, Number(token)])
      } else {
        lexedItems.push([typeOfLetter, token])
      }
    });
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
      const parsedSingleObj = getObj(lexedData)
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

  separatorChecker(expectedSeperator) {
    for(const key in separators) {
      if (separators[key] === expectedSeperator) return true;
    }
    return false;
  }

  getObj(lexedData) {
    const [type, value] = lexedData;
    return {
      type,
      value,
      child: []
    }
  }
}


const arrParser = new arrayParser()

arrParser.getParsedJson("[true, '123', null, [123, 123], undefined]");
