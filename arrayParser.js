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
            let tokenType = token;
            if(token.match(/[0-9]/)) {
                tokenType = 'number';
            } else if (token.match(/\s/)) {
                tokenType = 'whiteSpace';
            } else if (token.match(/,/)) {
                tokenType = 'updateItem';
            }
            rules.charProcessing.array[tokenType].call(this, token);
        });
        this.dataTree.push(this.tempMemory.pop());
        
        return this.dataTree.pop();
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
                let newTempItem = this.tempMemory.pop();

                if (!newTempItem){
                    newTempItem = {type: 'number', value: token};
                } else {
                    newTempItem = Object.assign(newTempItem, {value: newTempItem.value + token});
                }
                
                this.tempMemory.push(newTempItem);
            },
            'updateItem': function() { // append child object on temporary memory to parent array
                const currentDataBranch = rules.getLastItemOfArr(this.dataBranchQueue);
                let childToAdd = this.tempMemory.pop();
                
                if (!childToAdd) { 
                    childToAdd = {type: 'undefined', value: undefined};
                } else if(childToAdd.type !== 'object' && childToAdd.type !== 'array') { 
                    childToAdd = Object.assign( childToAdd, {value: rules.assignDataType(childToAdd)} );
                } else if(childToAdd.type === 'array') {
                    childToAdd = Object.assign( childToAdd, {value: 'arrayObject'} );
                }
                
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': () => undefined, // do nothing
            ']': function() { // append last child object on temporary memory. Close data branch
                rules.charProcessing.array.updateItem.bind(this)();
                
                const arrayLexeme = this.dataBranchQueue.pop();
                this.tempMemory.push(arrayLexeme);
            },
        },
    },
    getLastItemOfArr(arr) {
        return arr[arr.length-1]
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