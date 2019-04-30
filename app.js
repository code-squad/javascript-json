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
    let elem = '';

    const node = new Node({
      type: 'Array'
    });

    for (let i = 0; i < str.length; i++) {
      const word = str[i];

      if (word === '[') {
        const arrayNode = this.parseArray(str.slice(i + 1));
        node.child.push(arrayNode);
        break; // 이 부분이 중첩 시 문제 발생
      }

      if (word === ',') {
        node.child.push(this.makeNode(elem, node));
        elem = '';
        continue;
      }

      if (word === ']') {
        node.child.push(this.makeNode(elem, node));
        return node;
      }

      elem += word;
    }
    return node;
  },

  parse(str) {
    str = this.removeWhiteSpace(str);

    return this.parseArray(str.slice(1));
  }
};

const str = '[123, 3, 4]';
const result = parser.parse(str);
console.log(JSON.stringify(result, null, 2));

console.log('==========================================');

const str2 = '[123, [3, 4]]';
const result2 = parser.parse(str2);
console.log(JSON.stringify(result2, null, 2));
