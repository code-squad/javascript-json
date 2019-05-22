const tc = require('./typeChecker');
const Node = require('./node');
const util = require('./util');
const errorMsg = require('./errorMsg');

const makeLexedToken = (lexedTokens, token, index, tokens) => {
  const nextToken = tokens[index + 1];
  if (tc.isColon(nextToken)) {
    return [...lexedTokens, new Node({ key: token })];
  }
  if (tc.isComma(token)) {
    return lexedTokens;
  }
  if (tc.isColon(token)) {
    return lexedTokens;
  }
  if (tc.isNumber(token)) {
    return [...lexedTokens, new Node({ type: 'number', value: token })];
  }
  if (tc.isNull(token)) {
    return [...lexedTokens, new Node({ type: 'null', value: token })];
  }
  if (tc.isString(token)) {
    const tokenWithoutQuote = util.deletFirstLastChar(token);
    return [
      ...lexedTokens,
      new Node({ type: 'string', value: tokenWithoutQuote }),
    ];
  }
  if (tc.isUndefined(token)) {
    return [...lexedTokens, new Node({ type: 'undefined', value: token })];
  }
  if (tc.isOpenBraket(token)) {
    return [...lexedTokens, new Node({ type: 'array', child: [] })];
  }
  if (tc.isCloseBraket(token)) {
    return [...lexedTokens, new Node({ type: 'endArray' })];
  }
  if (tc.isOpenBrace(token)) {
    return [...lexedTokens, new Node({ type: 'object', child: [] })];
  }
  if (tc.isCloseBrace(token)) {
    return [...lexedTokens, new Node({ type: 'endObject' })];
  }
  if (tc.isBoolean(token)) {
    return [...lexedTokens, new Node({ type: 'boolean', value: token })];
  }

  throw new TypeError(`${token} ${errorMsg.UNKNOWN_TYPE}`);
};

module.exports = makeLexedToken;
