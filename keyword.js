module.exports = {
  '[': { context: 'ArrayOpen', type: 'Array' },
  ']': { context: 'ArrayClose', type: undefined },
  null: { context: 'Element', type: 'Null', value: null },
  true: { context: 'Element', type: 'Boolean', value: true },
  false: { context: 'Element', type: 'Boolean', value: false },
  undefined: { context: 'Element', type: 'Undefined', value: undefined }
};
