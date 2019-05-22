const nodeTypeChecker = {
  isEndOfArrOrObj(node) {
    return (
      node === undefined ||
      node.type === 'endArray' ||
      node.type === 'endObject'
    );
  },
  isKey(node) {
    return node.hasOwnProperty('key');
  },
  isArrayOrObj(node) {
    return node.type === 'array' || node.type === 'object';
  },
};
module.exports = nodeTypeChecker;
