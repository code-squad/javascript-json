'use strict'

// convert array in string form => return given array data in structured Object form
function arrayParser(arrStr) { 
    return arrLexer.lexer(arrStr)
}

const arrLexer = {
    tempMemory: [],
    dataBranchQueue: [],
    dataTree: [],
    lexer(arrStr) {
        // create array data branch & add chilren information
        arrStr.split('').forEach( (token) => { 
            const tokenDataObj = {token: token, queue: this.dataBranchQueue, memory: this.tempMemory};
            const tokenType = rules.tagTokenType(token);
            // if incoming string is not predefined, process it as string token
            if(!rules.charProcessing.array[tokenType]) { 
                rules.process('string', tokenDataObj, 'strToken', tokenType);
                return
            }
            rules.process('array', tokenDataObj, tokenType);
        });
        
        this.dataTree.push(this.tempMemory.pop());
        
        return this.dataTree.pop();
    },
};

const rules = {
    process(dataType, {token, queue, memory}, tokenType = this.tagTokenType(token)) {
        // Call proper token processing method following submitted dataType info
        this.charProcessing[dataType][tokenType](arguments[1]);
    },
    charProcessing: {
        array: {
            '[': function ({token, queue,memory}) { //open new data branch
                // if current stream is on string element, work as normal token
                if(memory[0] && memory[0].type === 'string') { 
                    rules.process('string',{token: token, queue, memory}, 'strToken');
                    return
                }

                const newArrayTree = {type: 'array', child: []};
                queue.push(newArrayTree);
            },
            'number': function({token, memory}) { // append or update last child object on temporary memory
                const currentTempItem = memory.pop();
                const updatedTempItem = rules.concatLexeme('number', token, currentTempItem);
                
                memory.push(updatedTempItem);
            },
            'stringInput': ({token, queue, memory}) => {rules.charProcessing.string.stringInput({token, queue, memory})},
            'string': function({token, queue, memory}) {
                if (!memory[0] && rules.getLastItemOfArr(queue).type !== 'string' ) { // If string token appears out of nowhere, process it as keyword
                    rules.process('keyword', arguments[0], 'keywordInput');
                    return
                }
                rules.charProcessing.string.strToken({token, memory});
            },
            'updateItem': function({token, queue, memory}) { // append child object on temporary memory to parent array
                //Update queue before update data stream with certain dataType
                const itemInMemory = memory.pop();
                rules.adjustQueue(itemInMemory, queue);
                
                const currentDataBranch = rules.getLastItemOfArr(queue);
                // if current stream is on string element, work as normal token
                if(currentDataBranch.type === 'string') { 
                    memory.push(itemInMemory);
                    rules.process('string',{token: token, queue, memory}, 'strToken');
                    return
                }

                const childToAdd = rules.updateItemValue(itemInMemory);
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': ({token, queue, memory}) => {
                const currentDataBranch = rules.getLastItemOfArr(queue);
                // if current stream is on string or number element, work as normal token
                if(memory[0] && ( memory[0].type === 'string' || memory[0].type === 'number') ) { 
                    rules.process('string',{token: token, queue, memory}, 'strToken');
                    return
                }

                return // Other than that, do nothing
            }, 
            ']': function({token, queue, memory}) { // append last child object on temporary memory. Close data branch
                // if current stream is on string element, work as normal token
                const currentDataBranch = rules.getLastItemOfArr(queue);
                if(currentDataBranch.type === 'string') { 
                    rules.process('string',{token: token, queue, memory}, 'strToken');
                    return
                }

                this.updateItem(arguments[0]);
                
                const arrayLexeme = queue.pop();
                memory.push(arrayLexeme);
            },
        },
        string: {
            'stringInput': function ({token, queue, memory}) { //open new data branch
                const currentDataBranch = rules.getLastItemOfArr(queue);
                
                // if there are ongoing string stream on queue, close it
                if ( currentDataBranch.type === 'string' ) {
                    memory[0].value += token;
                    queue.length--; // Notify queue that string stream is closed.
                    return
                }

                // If there are string stream left on memory and yet this function called, assign this lexeme as errorString to log error later when update lexeme to data tree
                // if it's all clear, create new clean data tree
                const newStrTree = (memory[0] && memory[0].type === 'string') ? {type: 'errorString', value: memory.pop().value + token} : {type: 'string', value: token};
                memory.push(newStrTree);
                queue.push(newStrTree);
            },
            'strToken': function({token, memory}) { // append or update last child object on temporary memory
                const currentTempItem = memory.pop();
                const updatedTempItem = rules.concatLexeme('string', token, currentTempItem);
                
                memory.push(updatedTempItem);
            },
        },
        keyword: {
            'keywordInput': function ({token, queue, memory}) { //open new data branch
                const newKeywordTree = {type: 'keyword', value: token};
                queue.push(newKeywordTree);
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
                    logError(`${dataObj.value} : 알 수 없는 타입입니다!`);
                }
                return Object.assign( dataObj, {value: updatedValueWithType} )
            },
            string: () => dataObj, // No update for string Object as it was initially given the value as string
            keyword: () => {
                const keywordObj = rules.charProcessing.keyword.dictionary[dataObj.value];
                
                if (!keywordObj) { // If given keyword lexeme doesn't exist on dictionary, log error
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
    adjustQueue(dataObj, queue) {
        const dataTypesRequireQueueAdjust = {
            'keyword': true,
            'errorString': true,
        }
        if (dataTypesRequireQueueAdjust[dataObj.type]) {
            queue.length--;
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