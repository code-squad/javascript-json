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
            rules.process('array', {token: token, queue: this.dataBranchQueue, memory: this.tempMemory})
        });
        
        this.dataTree.push(this.tempMemory.pop());
        
        return this.dataTree.pop();
    },
};

const rules = {
    process(dataType, {token, queue, memory}, tokenType = this.tagTokenType(token)) {
        this.charProcessing[dataType][tokenType](arguments[1]);
    },
    charProcessing: {
        array: {
            '[': function ({queue}) { //open new data branch
                const newArrayTree = {type: 'array', child: []};
                queue.push(newArrayTree);
            },
            'number': function({token, memory}) { // append or update last child object on temporary memory
                const currentTempItem = memory.pop();
                const updatedTempItem = rules.updateLexeme('number', token, currentTempItem);
                
                memory.push(updatedTempItem);
            },
            'stringInput': ({queue}) => {rules.charProcessing.string.stringInput({queue})},
            'string': function({token, queue, memory}) {
                if (!memory[0] && rules.getLastItemOfArr(queue).type !== 'string' ) { // If string token appears out of nowhere, process it as keyword
                    rules.process('keyword', arguments[0], 'keywordInput');
                    return
                }
                rules.charProcessing.string.strToken({token, memory});
            },
            'updateItem': function({token, queue, memory}) { // append child object on temporary memory to parent array
                const childToAdd = rules.updateItemValue( memory.pop(), queue);
                const currentDataBranch = rules.getLastItemOfArr(queue);
                if(currentDataBranch.type === 'string') { // if current stream is on string element, work as normal token
                    rules.process('strToken',{token: token, queue, memory});
                }
                
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': () => undefined, // do nothing
            ']': function({queue, memory}) { // append last child object on temporary memory. Close data branch
                this.updateItem(arguments[0]);
                
                const arrayLexeme = queue.pop();
                memory.push(arrayLexeme);
            },
        },
        string: {
            'stringInput': function ({queue, memory}) { //open new data branch
                const currentDataBranch = rules.getLastItemOfArr(queue);
                
                // if there are ongoing string stream on queue, close it
                if ( currentDataBranch.type === 'string' ) {
                    queue.length--; // Notify queue that string stream is closed.
                    return
                }

                // It there are none, create new one.
                const newStrTree = {type: 'string', value: ''};
                queue.push(newStrTree);
            },
            'strToken': function({token, memory}) { // append or update last child object on temporary memory
                const currentTempItem = memory.pop();
                const updatedTempItem = rules.updateLexeme('string', token, currentTempItem);
                
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
    updateLexeme(type, token, tempItem) {
        if (!tempItem){
            tempItem = {type: type, value: token};
        } else {
            tempItem = Object.assign(tempItem, {value: tempItem.value + token});
        }

        return tempItem
    },
    updateItemValue(dataObj, queue) {
        const dataType = (dataObj) ? dataObj.type : noObj;
        const updateRule = {
            noObj: () => ( {type: 'undefined', value: undefined} ),
            array: () => Object.assign( dataObj, {value: 'arrayObject'} ),
            number: () => Object.assign( dataObj, {value: this.assignDataType(dataObj)} ),
            string: () => dataObj, // No update for string Object as it was initially given the value as string
            keyword: () => {
                queue.length--; // Notify queue that keyword stream is closed.
                return rules.charProcessing.keyword.dictionary[dataObj.value]
            },
        };

        return updateRule[dataType]()
    },
    assignDataType({type: targetType, value}) {
        const convertTypeTo = {
            'number': function(value) {
                return Number(value)
            },
        };
        return convertTypeTo[targetType](value)
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

// Export to tester.js 
module.exports.arrayParser = arrayParser;