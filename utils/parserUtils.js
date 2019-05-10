module.exports = {
  ChildObj(childType) {
    return {
      type: childType,
      child: []
    }
  },

  addChildObj({currKey, childObj, parsingDataObj}) {
    if (currKey !== null) {
      const withKeyObj = { key: currKey };
      Object.assign(withKeyObj, childObj);
      parsingDataObj.child.push(withKeyObj);
    } else {
      parsingDataObj.child.push(childObj);
    }
  }
};
