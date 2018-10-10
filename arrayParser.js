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

            rules.charProcessing.array[tokenType].call(this, token);
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
            '[': function () { //open new data branch
                const newArrayTree = {type: 'array', child: []};
                this.dataBranchQueue.push(newArrayTree);
            },
            'number': function(token) { // append or update last child object on temporary memory
                const currentTempItem = this.tempMemory.pop();
                const updatedTempItem = rules.updateLexeme('number', token, currentTempItem);
                
                this.tempMemory.push(updatedTempItem);
            },
            'updateItem': function() { // append child object on temporary memory to parent array
                const currentDataBranch = rules.getLastItemOfArr(this.dataBranchQueue);
                const childToAdd = rules.updateItemValue( this.tempMemory.pop() );
                
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': () => undefined, // do nothing
            ']': function() { // append last child object on temporary memory. Close data branch
                rules.charProcessing.array.updateItem.call(this);
                
                const arrayLexeme = this.dataBranchQueue.pop();
                this.tempMemory.push(arrayLexeme);
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
        if (!dataObj) { 
            dataObj = {type: 'undefined', value: undefined};
        } else if(dataObj.type !== 'object' && dataObj.type !== 'array') { 
            dataObj = Object.assign( dataObj, {value: this.assignDataType(dataObj)} );
        } else if(dataObj.type === 'array') {
            dataObj = Object.assign( dataObj, {value: 'arrayObject'} );
        }

        return dataObj
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