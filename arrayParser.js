'use strict'

// convert array in string form => return given array data in structured Object form
function arrayParser(arrStr) { 
    return new Lexer('array').lexer(arrStr)
}

class Lexer {
    constructor(dataType) {
        this.tempMemory = [];
        this.dataBranchStack = [];
        this.dataTree = [];
        this.dataType = dataType;
    }
    lexer(dataStr) {
        // create array data branch & add chilren information
        dataStr.split('').forEach( (token) => { 
            const tokenDataObj = {token: token, stack: this.dataBranchStack, memory: this.tempMemory};
            const tokenType = rules.tagTokenType(token);
            // if incoming string is not predefined, process it as string token
            if(!rules.charProcessing.array[tokenType]) { 
                rules.process('string', tokenDataObj, 'strToken');
                return
            }
            rules.process(this.dataType, tokenDataObj, tokenType);
        });
        
        this.dataTree.push(this.tempMemory.pop());
        
        return this.dataTree.pop();
    }
};

class DataObj {
    constructor(type, value) {
        if (value) {
            this.type = type;
            this.value = value;
            return
        }
        this.type = type;
    }

    updateType(type) {
        this.type = type;
        return this
    }
    updateValue(value) {
        this.value = value;
        return this
    }
    createChildArr() {
        this.child = [];
        return this
    }
    get clone() {
        var copiedInstance = Object.assign(
            Object.create(
            Object.getPrototypeOf(this)
            ),
            this
        );
        return copiedInstance;
        }
}

const rules = {
    process(dataType, {token, stack, memory}, tokenType = this.tagTokenType(token)) {
        // Call proper token processing method following submitted dataType info
        const [targetLocation, objToPush] = this.charProcessing[dataType][tokenType](arguments[1]);
        
        if(objToPush) {
            targetLocation.push(objToPush);
        }
    },
    getLastItemOfArr(arr) {
        return arr[arr.length-1]
    },
    concatLexeme(type, token, tempItem) {
        if (!tempItem){
            tempItem = new DataObj(type, token);
        } else {
            tempItem = tempItem.clone.updateValue(tempItem.value + token);
        }

        return tempItem
    },
    updateItemValue(dataObj) {
        const updateRule = {
            noObj: () => new DataObj('undefined', undefined),
            array: () => dataObj.clone.updateValue('arrayObject'),
            number: () => {
                const updatedValueWithType = this.assignDataType(dataObj);
                if(isNaN(updatedValueWithType)) {
                    // Log error message if data branch has other characters than number strings
                    logError(`${dataObj.value} : 알 수 없는 타입입니다!`);
                }

                return dataObj.clone.updateValue(updatedValueWithType)
            },
            string: () => dataObj, // Do nothing
            openString: () => dataObj.clone.updateType('string'),
            keyword: () => {
                const keywordObj = rules.charProcessing.keyword.dictionary[dataObj.value];
                
                // If given keyword lexeme doesn't exist on dictionary, log error
                if (!keywordObj) { 
                    logError(`${dataObj.value} : 존재하지 않는 명령어입니다!`);
                }

                return keywordObj
            },
            errorString: () => {
                logError(`${dataObj.value} : 올바른 문자열이 아닙니다!`);
            },
        };
        
        const dataType = (dataObj) ? dataObj.type : 'noObj';

        return updateRule[dataType]()
    },
    assignDataType({type: targetType, value}) {
        const convertTypeTo = {
            'number': (value) => Number(value),
        };
        return convertTypeTo[targetType](value)
    },
    adjustStack(dataObj, stack) {
        const typesRequireStackAdjustment = {
            'keyword': true,
            'errorString': true,
        }
        if (typesRequireStackAdjustment[dataObj.type]) {
            stack.length--;
        }
    },
    tagTokenType(token) {
        let tokenType = token;

        if(token.match(/[0-9]/)) {
            tokenType = 'number';
        } else if (token.match(/\s/)) {
            tokenType = 'whiteSpace';
        } else if (token.match(/,/)) {
            tokenType = 'appendElem';
        } else if (token.match(/['"`]/)) {
            tokenType = 'stringInput';
        } else if (token.match(/[a-zA-Z]/)) {
            tokenType = 'string';
        } else if (token.match(/\[/)) {
            tokenType = 'arrayOpen';
        } else if (token.match(/\]/)) {
            tokenType = 'arrayClose';
        }

        return tokenType
    },
    removeAdditionalWhiteSpace(string) {
        return string.slice(0, string.match(/\S\s*$/).index + 1)
    },
};

/* ============================
    Token processing rules 
=============================== */
rules.charProcessing = {};
rules.charProcessing.array = {
    arrayOpen({token, stack, memory}) { //open new data branch
        if(memory[0] && memory[0].type === 'openString') {
            return rules.charProcessing.string.strToken({token, stack, memory})
        }

        const newArrayTree = new DataObj('array').createChildArr();
        return [stack, newArrayTree]
    },
    number({token, memory}) { // append or update last child object on temporary memory
        const currentTempItem = memory.pop();
        const updatedTempItem = rules.concatLexeme('number', token, currentTempItem);
        
        return [memory, updatedTempItem]
    },
    stringInput({token, stack, memory}) {
        return rules.charProcessing.string.stringInput({token, stack, memory})
    },
    string({token, stack, memory}) {
        // If string token appears out of nowhere, process it as opening token for keyword stream 
        if (!memory[0]) {
            return rules.charProcessing.keyword.keywordInput({token, stack, memory});
        }
        return rules.charProcessing.string.strToken({token, stack, memory})
    },
    appendElem({token, stack, memory}) { // Append item in memory to parent array
        // if current stream is on string element, process token as pure string
        if(memory[0] && memory[0].type === 'openString') {
            return rules.charProcessing.string.strToken({token, stack, memory})
        }
        
        const itemInMemory = memory.pop();
        const currentDataBranch = rules.getLastItemOfArr(stack);
        // if item to update is keyword / string / number, remove all trailing whitespaces
        if (itemInMemory && itemInMemory.value) {
            itemInMemory.value = rules.removeAdditionalWhiteSpace(itemInMemory.value);
        }

        const childToAdd = rules.updateItemValue(itemInMemory);
        
        return [currentDataBranch.child, childToAdd]
    },
    whiteSpace({token, stack, memory}) {
        // if current stream is object or array element, do nothing
        const isNotObjectNorArray = ( dataObj ) => {
            if (dataObj) {
                if(dataObj.type !== 'object' || dataObj.type !== 'array') return true
            }
            return false
        };
        
        if( isNotObjectNorArray(memory[0]) ) { 
            return rules.charProcessing.string.strToken({token, stack, memory});
        }
        
        return []// Nothing will happen
    }, 
    arrayClose({token, stack, memory}) { // Append last child object on temporary memory. And then close data branch
        // if current stream is on string element, work as normal token
        if(memory[0] && memory[0].type === 'openString') { 
            return rules.charProcessing.string.strToken({token, stack, memory});
        }

        if(memory[0]) { // append leftover element if exists
            rules.process('array', {token, stack, memory}, 'appendElem');
        }
        
        const arrayLexeme = stack.pop();
        return [memory, arrayLexeme]
    },
};
rules.charProcessing.string = {
    stringInput ({token, stack, memory}) { // Open new data branch if there is no current one. If it exists, close it.
        // if there are ongoing string stream on stack, close it
        if ( memory[0] && memory[0].type === 'openString' ) {
            const concatedToken = rules.concatLexeme('string', token, memory.pop());
            return [memory, rules.updateItemValue(concatedToken)];
        }

        // If there are string stream left on memory and yet this function was called, 
        // assign current lexeme as errorString to log error later when update lexeme to parent array
        const newStrTree = ( () => {
            if (memory[0] && memory[0].type === 'string') {
                return new DataObj('errorString', memory.pop().value + token)
            }
             return new DataObj('openString', token)
        }) ();

        return [memory, newStrTree]
    },
    strToken({token, memory}) { // append or update last child object on temporary memory
        const currentTempItem = memory.pop();
        const updatedTempItem = rules.concatLexeme('string', token, currentTempItem);
        
        return [memory, updatedTempItem]
    },
};

rules.charProcessing.keyword = {
    keywordInput ({token, stack, memory}) { //open new data branch
        const newKeywordTree = new DataObj('keyword', token);
        
        return [memory, newKeywordTree]
    },
    dictionary: {
        'true': new DataObj('boolean', true),
        'false': new DataObj('boolean', false),
        'null': new DataObj('object', null),
    },
};


function logError(msgStr) {
    try {
        throw msgStr
    }
    catch(e) {
        console.log(e);
    }
}




// Export to tester.js 
module.exports.arrayParser = arrayParser;