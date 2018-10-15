'use strict'

// convert array in string form => return given array data in structured Object form
function arrayParser(arrStr) { 
    return arrLexer.lexer(arrStr)
}

const arrLexer = {
    tempMemory: [],
    dataBranchStack: [],
    dataTree: [],
    lexer(arrStr) {
        // create array data branch & add chilren information
        arrStr.split('').forEach( (token) => { 
            const tokenDataObj = {token: token, stack: this.dataBranchStack, memory: this.tempMemory};
            const tokenType = rules.tagTokenType(token);
            // if incoming string is not predefined, process it as string token
            if(!rules.charProcessing.array[tokenType]) { 
                rules.process('string', tokenDataObj, 'strToken');
                return
            }
            rules.process('array', tokenDataObj, tokenType);
        });
        
        this.dataTree.push(this.tempMemory.pop());
        
        return this.dataTree.pop();
    },
};

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
            tempItem = {type: type, value: token};
        } else {
            tempItem = Object.assign(tempItem, {value: tempItem.value + token});
        }

        return tempItem
    },
    updateItemValue(dataObj) {
        const updateRule = {
            noObj: () => ( {type: 'undefined', value: undefined} ),
            array: () => Object.assign( dataObj, {value: 'arrayObject'} ),
            number: () => {
                const updatedValueWithType = this.assignDataType(dataObj);
                if(isNaN(updatedValueWithType)) {
                    // Log error message if data branch has other characters than number strings
                    logError(`${dataObj.value} : 알 수 없는 타입입니다!`);
                }

                return Object.assign( dataObj, {value: updatedValueWithType} )
            },
            string: () => dataObj, // Do nothing
            openString: () => Object.assign( dataObj, {type: 'string'} ), 
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

        const newArrayTree = {type: 'array', child: []};
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
                return (dataObj.type !== 'object' || dataObj.type !== 'array') ? true : false
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
                return {type: 'errorString', value: memory.pop().value + token}
            }
             return {type: 'openString', value: token}
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
        const newKeywordTree = {type: 'keyword', value: token};
        
        return [memory, newKeywordTree]
    },
    dictionary: {
        'true': {type: 'boolean', value: true},
        'false': {type: 'boolean', value: false},
        'null': {type: 'object', value: null},
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