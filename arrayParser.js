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
        this.charProcessing[dataType][tokenType](arguments[1]);
    },
    charProcessing: {
        array: {
            '[': function ({token, stack, memory}) { //open new data branch
                // if current stream is string element, process token as pure string
                if(memory[0] && memory[0].type === 'string') { 
                    rules.process('string',{token: token, stack, memory}, 'strToken');
                    return
                }

                const newArrayTree = {type: 'array', child: []};
                stack.push(newArrayTree);
            },
            'number': function({token, memory}) { // append or update last child object on temporary memory
                const currentTempItem = memory.pop();
                const updatedTempItem = rules.concatLexeme('number', token, currentTempItem);
                
                memory.push(updatedTempItem);
            },
            'stringInput': function({token, stack, memory}) {
                rules.charProcessing.string.stringInput(arguments[0]);
            },
            'string': function({token, stack, memory}) {
                // If string token appears out of nowhere, process it as opening token for keyword stream 
                if (!memory[0]) {
                    rules.process('keyword', arguments[0], 'keywordInput');
                    return
                }
                rules.charProcessing.string.strToken({token, memory});
            },
            'updateItem': function({token, stack, memory}) { // Append item on memory to parent array
                const itemInMemory = memory.pop();
                const currentDataBranch = (() => {
                    // Close temporary stack for dataTypes opening temporary stream (i.e keywords, errorStrings...)
                    rules.adjustStack(itemInMemory, stack);
                    return rules.getLastItemOfArr(stack);
                })();

                // if current stream is on string element, process token as pure string
                if(currentDataBranch.type === 'string') { 
                    memory.push(itemInMemory);
                    rules.process('string',{token: token, stack, memory}, 'strToken');
                    return
                }

                // if item to update is keyword / string / number, remove all trailing whitespaces
                if (itemInMemory && itemInMemory.value) {
                    itemInMemory.value = itemInMemory.value.slice(0, itemInMemory.value.match(/\S\s*$/).index + 1);
                }

                const childToAdd = rules.updateItemValue(itemInMemory);
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': ({token, stack, memory}) => {
                // if current stream is not for object/array element, work as normal string token
                if(memory[0] && ( memory[0].type !== 'object' || memory[0].type !== 'array') ) { 
                    rules.process('string',{token: token, stack, memory}, 'strToken');
                    return
                }

                return // Other than that, do nothing
            }, 
            ']': function({token, stack, memory}) { // Append last child object on temporary memory. And then close data branch
                // if current stream is on string element, work as normal token
                const currentDataBranch = rules.getLastItemOfArr(stack);
                if(currentDataBranch.type === 'string') { 
                    rules.process('string',{token: token, stack, memory}, 'strToken');
                    return
                }

                this.updateItem(arguments[0]);
                
                const arrayLexeme = stack.pop();
                memory.push(arrayLexeme);
            },
        },
        string: {
            'stringInput': function ({token, stack, memory}) { // Open new data branch if there is no current one. If it exists, close it.
                const currentDataBranch = rules.getLastItemOfArr(stack);
                
                // if there are ongoing string stream on stack, close it
                if ( currentDataBranch.type === 'string' ) {
                    memory[0].value += token;
                    stack.length--; // Notify stack that string stream is closed.
                    return
                }

                // If there are string stream left on memory and yet this function called, assign this lexeme as errorString to log error later when update lexeme to data tree
                const newStrTree = (memory[0] && memory[0].type === 'string') ? {type: 'errorString', value: memory.pop().value + token} : {type: 'string', value: token};
                // if it's all clear, create new clean data tree
                memory.push(newStrTree);
                stack.push(newStrTree);
            },
            'strToken': function({token, memory}) { // append or update last child object on temporary memory
                const currentTempItem = memory.pop();
                const updatedTempItem = rules.concatLexeme('string', token, currentTempItem);
                
                memory.push(updatedTempItem);
            },
        },
        keyword: {
            'keywordInput': function ({token, stack, memory}) { //open new data branch
                const newKeywordTree = {type: 'keyword', value: token};
                stack.push(newKeywordTree);
                memory.push(newKeywordTree);
            },
            dictionary: {
                'true': {type: 'boolean', value: true},
                'false': {type: 'boolean', value: false},
                'null': {type: 'object', value: null},
            }
        },
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
            string: () => dataObj, // No update for string Object as it was initially given the value as string
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
        
        const dataType = (dataObj) ? dataObj.type : noObj;

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
            tokenType = 'updateItem';
        } else if (token.match(/['"`]/)) {
            tokenType = 'stringInput';
        } else if (token.match(/[a-zA-Z]/)) {
            tokenType = 'string';
        }

        return tokenType
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