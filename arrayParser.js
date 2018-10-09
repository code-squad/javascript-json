'use strict'

// convert array in string form => return given array data in structured Object form
function arrayParser(arrStr) { 
    
    
}

const lexer = {
    tokenStream: [],
    dataTree: [],
    tempMemory: [],
    setTokenStream(arrStr) {
        this.tokenStream = arrStr.split('');
    },
    lexer(arrStr) {
        tokenStream.forEach( (token) => {
            const tokenType = token;
            if(token.match(/[0-9]/)) {
                tokenType = 'number'
            }
            this.charProcessingRule.array[tokenType].call(this, token);

        });

        return lexemeArr
    },
    charProcessingRule: {
        array: {
            '[': () => this.lexemeArr.push( {type: 'array', child: []} ),
            'number': (token) => {
                const itemInMemory = this.tempMemory.pop();
                if (!itemInMemory){
                    this.tempMemory.push( {type: 'number', value: Number(token)} );
                    return
                }
                const newTempItem = Object.assign(itemInMemory, {value: itemInMemory.value + Number(token)});
                this.tempMemory.push(newTempItem);
            },
            ',': 
        }
    }
}





// Export to tester.js 
module.exports.arrayParser = arrayParser;