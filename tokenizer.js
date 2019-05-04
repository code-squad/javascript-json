const tc = require('./typeChecker');
const Token = require('./token');

let _currentLength = 0;
let _inputStr= '';
let _queue = [];

const _readChar =(currentLength) => _inputStr[currentLength]

const _getSeriesToken = (readChar, char, conditionFunc) => {
    if (!conditionFunc(char)) return '' 
    return char + _getSeriesToken(readChar, readChar(++_currentLength), conditionFunc)
}

const _getSeriesStrToken = (readChar, char, conditionFunc) => {
    if (conditionFunc(char)) { _currentLength++; return ''} 
    return char + _getSeriesStrToken(readChar, readChar(++_currentLength), conditionFunc)  
}
const _decideTokenType = (char) => {
    if (tc.isSkipChar(char)) return

    if (tc.isOpenBraket(char))return new Token('openBraket', char);
    
    if (tc.isCloseBraket(char))return new Token('closeBraket', char);

    if (tc.isNumber(char)) return new Token('number', _getSeriesToken(_readChar, char, tc.isNumber))
    //TODO STPE 6-2  
    if (tc.isQuote(char)) return new Token("string", _getSeriesStrToken(_readChar, _readChar(++_currentLength), tc.isQuote))
    //TODO STPE 6-2    
    if (tc.isString(char)) {
        let token = _getSeriesToken(_readChar, char, tc.isString)
        return new Token(token, token)
    }
    throw new TypeError(char + " 는 토근화 할 수 없는 문자 입니다.")
}

const _isTokentypeSkipOrBraket =(token) => token === undefined || /Braket/.test(token.type)

const tokenize = (input) => {
    _inputStr = input;
    while(_currentLength < _inputStr.length) {
        const token = _decideTokenType(_readChar(_currentLength))
        if (token) _queue.push(token);
        if (_isTokentypeSkipOrBraket(token)) _currentLength++;
    }
    return _queue;
}

module.exports = tokenize;
