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
            const typeOfItemInMemory = (tokenDataObj.memory[0]) ? tokenDataObj.memory[0].type : undefined;
            // Process token as string if:
                // incoming string is not predefined, 
                // or currently there are openString stream in memory
            if(!rules.array[tokenType] || typeOfItemInMemory === 'openString') { 
                if (tokenType === 'stringInput') {
                    rules.process('string', tokenDataObj, 'stringInput');
                }
                rules.process('string', tokenDataObj, 'strToken');
                return
            }
            rules.process(this.dataType, tokenDataObj, tokenType);
        });
        
        this.dataTree.push(this.tempMemory.pop());
        
        // Throw Error if there are leftover stream in stack (e.g. Object, Array...)
        rules.checkUnclosedObject(this.dataBranchStack, 'runtimeEnd');
        
        return this.dataTree.pop();
    }
};

class DataObj {
    constructor(type, value) {
        if (value !== undefined) {
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
        const [targetLocation, objToPush] = this[dataType][tokenType](arguments[1]);
        
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
                const keywordObj = rules.keyword.dictionary[dataObj.value];
                
                // If given keyword lexeme doesn't exist on dictionary, log error
                if (!keywordObj) { 
                    logError(`${dataObj.value} : 존재하지 않는 명령어입니다!`);
                }

                return keywordObj
            },
            errorString: () => {
                logError(`${dataObj.value} : 올바른 문자열이 아닙니다!`);
            },
            object: () => dataObj,
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
        const obviousTypes = {
            ',' : 'appendElem',
            '[' : 'arrayOpen',
            ']' : 'arrayClose',
            '{' : 'objectOpen',
            '}' : 'objectClose',
            ':' : 'appendObjKey',
        }

        // Return obvious types first
        if (obviousTypes[token]) {
            return obviousTypes[token]
        }

        // If token is not obvious, check following character ranges
        if(token.match(/[0-9]/)) {
            tokenType = 'number';
        } else if (token.match(/\s/)) {
            tokenType = 'whiteSpace';
        } else if (token.match(/['"`]/)) {
            tokenType = 'stringInput';
        } else if (token.match(/[a-zA-Z]/)) {
            tokenType = 'string';
        }

        return tokenType
    },
    removeAdditionalWhiteSpace(string) {
        return string.slice(0, string.match(/\S\s*$/).index + 1)
    },
    checkUnclosedObject(stack, processType){
        const lastStackItem = rules.getLastItemOfArr(stack);
        const bSomethingLeftOnProgramEnd = (processType === 'runtimeEnd' && !!lastStackItem);
        const bObjectEndMismatch = (processType !== 'runtimeEnd' && processType !== lastStackItem.type);

        if (bSomethingLeftOnProgramEnd || bObjectEndMismatch) { 
            logError(`[Error] : 닫히지 않은 ${lastStackItem.type} 객체가 있습니다!\n[상세 정보] ${JSON.stringify(lastStackItem, null, 2)}`);
            stack.pop() // Remove mismatched stack to prevent further error
            return false
        }

        return true
    },
};

/* ============================
    Token processing rules 
=============================== */
rules.array = {
    arrayOpen({token, stack, memory}) { //open new data branch
        const bObjKeyHasColon = memory[0] && rules.getLastItemOfArr(stack).type === 'object';
        if(bObjKeyHasColon) {
            logError(`[Error]: 콜론이 사용되지 않은 객체 표현 \n[상세 정보]${JSON.stringify(memory[0],null,2)}`);
            memory.pop(); // Remove wrong value in memory to prevent another error message
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
        return rules.string.stringInput({token, stack, memory})
    },
    string({token, stack, memory}) {
        // If string token appears out of nowhere, process it as opening token for keyword stream 
        if (!memory[0]) {
            return rules.keyword.keywordInput({token, stack, memory});
        }
        return rules.string.strToken({token, stack, memory})
    },
    appendElem({token, stack, memory}) { // Append item in memory to parent array
        if(memory[0]) {
            if(rules.getLastItemOfArr(stack).type === 'objectProperty') {
                return rules.object.appendKeyValPair({token, stack, memory})
            }
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
            return rules.string.strToken({token, stack, memory});
        }
        
        return []// Nothing will happen
    }, 
    arrayClose({token, stack, memory}) { // Append last child object on temporary memory. And then close data branch
        if(memory[0]) { // append leftover element if exists
            rules.process('array', {token, stack, memory}, 'appendElem');
        }
        
        const bNoObjectMismatch = rules.checkUnclosedObject(stack, 'array');
        if (!bNoObjectMismatch) {
            return [memory, stack.pop()] // Ignore current stack & move on to next stack item 
        }
        
        const arrayLexeme = stack.pop();
        return [memory, arrayLexeme]
    },
    objectOpen: ({token, stack, memory}) => rules.object.objectOpen({token, stack, memory}),
    objectClose: ({token, stack, memory}) => rules.object.objectClose({token, stack, memory}),
    appendObjKey: ({token, stack, memory}) => rules.object.appendObjKey({token, stack, memory}),
};
rules.string = {
    stringInput ({token, stack, memory}) { // Open new data branch if there is no current one. If it exists, close it.
        // if there are ongoing string stream on stack, close it
        if ( memory[0] && memory[0].type === 'openString' ) {
            return [memory, rules.updateItemValue(memory.pop())];
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

rules.keyword = {
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

rules.object = {
    objectOpen({token, stack, memory}) {
        const bObjKeyHasColon = memory[0] && rules.getLastItemOfArr(stack).type === 'object';
        if(bObjKeyHasColon) {
            logError(`[Error]: 콜론이 사용되지 않은 객체 표현 \n[상세 정보]${JSON.stringify(memory[0],null,2)}`);
            memory.pop(); // Remove wrong value in memory to prevent another error message
        }

        const newObjTree = new DataObj('object').createChildArr();
        return [stack, newObjTree]
    },
    objectClose({token, stack, memory}) {
        if(memory[0]) { // append leftover element if exists
            rules.process('array', {token, stack, memory}, 'appendElem');
        }
        
        const bNoObjectMismatch = rules.checkUnclosedObject(stack, 'object');
        if (!bNoObjectMismatch) {
            return [memory, stack.pop()] // Ignore current stack & move on to next stack item 
        }
        
        const childrenOfCurrentObj = rules.getLastItemOfArr(stack).child;
        const bNoMissingKeys = childrenOfCurrentObj.every( data => data.type === 'objectProperty');
        if (!bNoMissingKeys) {
            logError(`[Error] 키가 없는 객체 속성이 존재합니다! \n[상세 정보]${JSON.stringify(childrenOfCurrentObj, null, 2)}`);
            // childrenOfCurrentObj.length = 0; // remove invalid children to prevent further error
            stack.pop();
            return [] // Do nothing
        }
        
        const objLexeme = stack.pop();
        return [memory, objLexeme]
    },
    appendObjKey({token, stack, memory}) {
        let itemInMemory = memory.pop();
        
        // If data of itemInMemory has type of object or array, log error 
        const bItemIsObjectOrArray = itemInMemory && (itemInMemory.type === 'object' || itemInMemory.type === 'array' );
        if(bItemIsObjectOrArray) {
            logError(`[Error]: 올바르지 않은 객체 키 자료형 \n[상세 정보]${JSON.stringify(itemInMemory,null,2)}`);
            // Apply 'toString' to itemInMemory for further processing
            itemInMemory = itemInMemory.toString();
        }

        // if item to update is keyword / string / number, remove all trailing whitespaces
        if (itemInMemory && itemInMemory.value) {
            itemInMemory.value = rules.removeAdditionalWhiteSpace(itemInMemory.value);
        }

        const keyValPairObj = new DataObj('objectProperty', {'propKey': itemInMemory});
        
        return [stack, keyValPairObj]
    },
    appendKeyValPair({token, stack, memory}) {
        const currentTempItem = memory.pop();
        const targetKeyValPairOnStack = stack.pop();
        const parentObject = rules.getLastItemOfArr(stack);
        const keyValPairObj = ( () => {
            const completedKeyValpair = Object.assign({}, targetKeyValPairOnStack.value, {'propValue': currentTempItem});
            return targetKeyValPairOnStack.clone.updateValue(completedKeyValpair)
        })();

        return [parentObject.child, keyValPairObj]
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