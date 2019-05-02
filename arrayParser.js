const lexer = (inputString) => {
  const splitLetters = inputString.split('');
  const lexedItems = [];
  const seperators = ["[", "]", ",", " "];
    
  splitLetters.reduce( (acc, cur) => {
    if(!seperators.includes(acc) && seperators.includes(cur)) lexedItems.push(acc);
    if(!seperators.includes(acc) && !seperators.includes(cur)) return acc+cur;
    return cur
  });
  return lexedItems;
}

const parser = (inputString) => {
  const lexedItem = lexer(inputString);
  const result = lexedItem.map( letter => {
    if(isNaN(Number(letter))) {
      return letter;
    } else {
      return Number(letter);
    }
  })
  print(result);
}

const typeChecker = thingsToCheck => {
  if(Array.isArray(thingsToCheck)) return "array"
  if(thingsToCheck === "true" || thingsToCheck === "false") return "boolean"
  if(thingsToCheck === "null") return 'object'
  return typeof thingsToCheck
}

const print = (lexedArray) => {
  const typeOfContainer = typeChecker(lexedArray);
  const result = {'type': typeOfContainer, 'child': []};

  lexedArray.forEach( elem => {
    const typeOfLetter = typeChecker(elem);
    const typeAndValue = {'type': typeOfLetter, 'value': elem}
    result.child.push(typeAndValue);
  })
  console.log(result);
}

parser("[123, undefined, 123N3F, null, 퇴근, 'true']")
//"[123, 123, 123, 123]"