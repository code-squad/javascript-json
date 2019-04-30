const Node = require('./node');

const parser = {
  removeWhiteSpace(str) {
    str = str.replace(/\s/g, '');
    return str;
  },

  makeNode(elem) {
    elem = Number(elem);
    return new Node({
      type: 'number',
      value: elem
    });
  },

  parseArray(str) {
    //
  },

  parse(str) {
    str = this.removeWhiteSpace(str);

    return this.parseArray(str.slice(1));
  }
};

const str = '[123, [3, 4], [22, 33]]';
const result = parser.parse(str);

console.log(JSON.stringify(result, null, 2));
