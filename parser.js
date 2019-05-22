const Node = require('./node');
const ntc = require('./nodeTypeCheker');

const defaultParentNode = new Node({ type: 'array', child: [] });
const parse = ({ lexedQueue, parentNode = defaultParentNode }) => {
  let currentNode = lexedQueue.shift();

  if (ntc.isEndOfArrOrObj(currentNode)) return parentNode;

  if (ntc.isKey(parentNode)) {
    return ntc.isArrayOrObj(currentNode)
      ? parse({ lexedQueue, parentNode: currentNode })
      : currentNode;
  }

  if (ntc.isArrayOrObj(currentNode)) {
    parentNode.child.push(parse({ lexedQueue, parentNode: currentNode }));
    return parse({ lexedQueue, parentNode });
  }
  // 노드가 key인 경우 다음에 나오는 노드와 병합하여 완전한 key: value 객체 를 만듬
  if (ntc.isKey(currentNode)) {
    const objKeyNode = currentNode;
    const objValueNode = parse({ lexedQueue, parentNode: objKeyNode });
    currentNode = Object.assign(objKeyNode, objValueNode);
  }

  parentNode.child.push(currentNode);
  return parse({ lexedQueue, parentNode });
};

module.exports = parse;
