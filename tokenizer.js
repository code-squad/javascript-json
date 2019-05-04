const tc = require('./typeChecker');
const Token = require('./token');

let _currentLength = 0;

class Tokenizer {
    constructor(inputstr){
        this.queue = [];
        this._inputStr = inputstr;
    }
    _readChar(currentLength){
            return this._inputStr[currentLength]
    }
    _getSeriesToken (readChar, char, conditionFunc){
        if(!conditionFunc(char)) return '' 
        return char + this._getSeriesToken(readChar, readChar(++_currentLength), conditionFunc)  
      }
    _getSeriesStrToken(readChar, char, conditionFunc){
      if(conditionFunc(char)) {
        _currentLength++
        return '';
      } 
      return char + this._getSeriesStrToken(readChar, readChar(++_currentLength), conditionFunc)  
    }
    _decideTokenType(char){
        if (tc.isSkipChar(char)) return;

        if (tc.isBraket(char)) return new Token('braket', char)

        if (tc.isNumber(char)) {
            return new Token('number', this._getSeriesToken(this._readChar.bind(this),char, tc.isNumber));
        }
        //TODO STPE 6-2  
        if (tc.isQuote(char)) {
            return new Token("string", this._getSeriesStrToken(this._readChar.bind(this), this._readChar(++_currentLength), tc.isQuote))
        }
        //TODO STPE 6-2    
        if (tc.isString(char)) {
            return new Token("otherType", this._getSeriesToken(this._readChar.bind(this), char, tc.isString))
        }

        throw new TypeError(char + " 는 토근화 할 수 없는 문자 입니다.");
        }
    _decideReadNextChar(token){
        return ( token === undefined || token.type === 'braket')
    }
    tokenize(){
        while(_currentLength < this._inputStr.length) {
            const token = this._decideTokenType(this._readChar(_currentLength))
            if(token) this.queue.push(token);
            if(this._decideReadNextChar(token)) _currentLength++;
        }
    }
}

test = new Tokenizer("[123,['I', 'Can'], [false, true, 123]]")
test.tokenize()