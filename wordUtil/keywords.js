const WordType = require('./wordType');
const Word = require('./word');

module.exports = [
  new Word(WordType.NumberType, 'NaN'),
  new Word(WordType.NumberType, 'Infinity'),

  new Word(WordType.NullType, 'null'),

  new Word(WordType.BooleanType, 'true'),
  new Word(WordType.BooleanType, 'false'),
]