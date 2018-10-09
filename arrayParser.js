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
            } 
            rules.charProcessing.array[tokenType].call(this, token);
        });
        
        return this.dataTree.pop();
    }
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
            ',': function() { // append child object on temporary memory to parent array
                const currentDataBranch = util.getLastItemOfArr(this.dataBranchQueue);
                let childToAdd = this.tempMemory.pop();
                
                if (!childToAdd) { 
                    childToAdd = {type: 'undefined', value: undefined};
                } else if(childToAdd.type !== 'object' && childToAdd.type !== 'array') { 
                    childToAdd = Object.assign( childToAdd, {value: util.assignDataType(childToAdd)} );
                }
                
                currentDataBranch.child.push(childToAdd);
            },
            'whiteSpace': () => undefined, // do nothing
            ']': function() { // append last child object on temporary memory. Close data branch
                const currentDataBranch = util.getLastItemOfArr(this.dataBranchQueue);
                const childToAdd = this.tempMemory.pop();

                if (childToAdd) {
                    currentDataBranch.child.push(childToAdd);
                }
                
                const arrayLexeme = this.dataBranchQueue.pop();
                this.dataTree.push(arrayLexeme);
            }
        }
    }
};

const util = {
    getLastItemOfArr(arr) {
        return arr[arr.length-1]
    },
    assignDataType({type: targetType, value}) {
        const processingRulesTo = {
            'number': function(value) {
                return Number(value)
            }
        };
        return processingRulesTo[targetType](value)
    }
}

// Export to tester.js 
module.exports.arrayParser = arrayParser;