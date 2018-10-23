class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    const node = new Node(data);

    node.next = this.top;
    this.top = node;
  }

  pop() {
    if (!this.top) return;

    const data = this.top.data;
    this.top = this.top.next;

    return data;
  }

  peek() {
    return this.top.data;
  }

  concat() {
    const topData = stack.pop();
    if (stack.top) stack.peek().child.push(topData);

    return topData;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function arrayParser() {
  class Data {
    constructor(type, value) {
      this.type = type;
      this.value = value;
      this.child = [];
    }
  }

  const stack = new Stack();

  function tokenizer(str) {
    const tokens = [];
    let token = '';
    let bString = false;

    for (let char of str) {
      if (char === '[') {
        tokens.push(char);
      }
      else if (char === "'") {
        bString = !bString;
        token += char;
      }
      else if (char === ',') {
        if (bString) {
          token += char;
        }
        else {
          tokens.push(token);
          token = '';
        }
      }
      else if (char === ']') {
        tokens.push(token);
        token = '';
        token += char;
      }
      else {
        token += char;
      }
    }

    tokens.push(token);

    return tokens;
  }

  function parser(tokens) {
    let dataValue = '';
    let parsedData;

    for (let token of tokens) {
      if (token.match(/\[/)) {
        stack.push(new Data("array", "ArrayObject"));
      }
      else if (token.match(/,|\]/)) {
        if (dataValue) pushLexerToTop(lexer(dataValue));
        dataValue = '';
        if (token === ']') parsedData = stack.concat();
      }
      else {
        dataValue += token;
      }
    }
    return dataValue ? new Data("number", Number(dataValue)) : parsedData;
  }

  function lexer(data) {
    if (data.match(/[0-9]+/)) return new Data("number", Number(data));
    if (data.match(/\w/)) return new Data("string", String(data));
    if (data.match(/true|false/)) return new Data("boolean", Boolean(data));
    if (data.match(/null/)) return new Data("object", null);
  }

  function pushLexerToTop(lexerData) {
    const topChild = stack.peek().child;
    topChild.push(lexerData);
  }

  return (str) => {
    const tokens = tokenizer(str);
    return parser(tokens);
  }
};

/*
Test Case
*/
const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result = arrayParser(str);
console.log(JSON.stringify(result, null, 2));