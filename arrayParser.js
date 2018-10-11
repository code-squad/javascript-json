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
            const tokenType = this.tagTokenType(token);

            rules.charProcessing.array[tokenType]({token: token, queue: this.dataBranchQueue, memory: this.tempMemory});
        });
        
        this.dataTree.push(this.tempMemory.pop());
        
        return this.dataTree.pop();
    },
    tagTokenType(token) {
        let tokenType = token;
        
        if(token.match(/[0-9]/)) {
            tokenType = 'number';
        } else if (token.match(/\s/)) {
            tokenType = 'whiteSpace';
        } else if (token.match(/,/)) {
            tokenType = 'updateItem';
        }

        return tokenType
    },
};

const rules = {
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
            'updateItem': function({queue, memory}) { // append child object on temporary memory to parent array
                const currentDataBranch = rules.getLastItemOfArr(queue);
                const childToAdd = rules.updateItemValue( memory.pop() );
                
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': () => undefined, // do nothing
            ']': function({queue, memory}) { // append last child object on temporary memory. Close data branch
                this.updateItem(arguments[0]);
                
                const arrayLexeme = queue.pop();
                memory.push(arrayLexeme);
            },
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
    updateItemValue(dataObj) {
        const dataType = (dataObj) ? dataObj.type : noObj;
        const updateRule = {
            noObj: () => { return {type: 'undefined', value: undefined} },
            array: () => Object.assign( dataObj, {value: 'arrayObject'} ),
            number: () => Object.assign( dataObj, {value: this.assignDataType(dataObj)} ),
        };

        return updateRule[dataType]()
    },
    assignDataType({type: targetType, value}) {
        const processingRulesTo = {
            'number': function(value) {
                return Number(value)
            },
        };
        return processingRulesTo[targetType](value)
    },
};

// Export to tester.js 
module.exports.arrayParser = arrayParser;