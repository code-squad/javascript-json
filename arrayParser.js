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
        const dataStrArr = dataStr.split('');
        function tokenProcessor(token, stack, memory, dataType) { 
            const tokenDataObj = {token: token, stack: stack, memory: memory};
            const tokenType = rules.tagTokenType(token);
            const typeOfItemInMemory = (tokenDataObj.memory[0]) ? tokenDataObj.memory[0].type : undefined;
            // Process token as string if:
                // incoming string is not predefined, 
                // or currently there are openString stream in memory
            if(!rules.array[tokenType] || typeOfItemInMemory === 'openString') { 
                if (tokenType === 'stringInput') {
                    rules.process('string', tokenDataObj, 'stringInput');
                }
                return rules.process('string', tokenDataObj, 'strToken');
            }
            return rules.process(dataType, tokenDataObj, tokenType);
        }
        let tokenIdx = -1;
        for (let token of dataStrArr) { 
            tokenIdx++;
            const bProcessedWithoutIssue = tokenProcessor(token, this.dataBranchStack, this.tempMemory, this.dataType);
            if (!bProcessedWithoutIssue) {
                console.log(`토큰 처리 중 오류가 발생하여 프로그램을 종료합니다. 오류가 기록된 문자열 : ${tokenIdx+1}번째 문자 " ${token} "`);
                return false
            }
        }
        
        this.dataTree.push(this.tempMemory.pop());
        
        // Throw Error if there are leftover stream in stack (e.g. Object, Array...)
        const bHasNoUnclosedObj = rules.checkUnclosedObject(this.dataBranchStack, 'runtimeEnd');
        if (!bHasNoUnclosedObj) return false
        
        return this.dataTree.pop();
    }
};

class DataObj {
    constructor(type, value) {
        if (value !== undefined) this.value = value;
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
        const copiedInstance = (
            Object.assign(
                Object.create(
                    Object.getPrototypeOf(this)
                ),
                this
            )
        );
        return copiedInstance;
        }
}

const rules = {
    process(dataType, {token, stack, memory}, tokenType = this.tagTokenType(token)) {
        // Call proper token processing method following submitted dataType info
        const [targetLocation, objToPush] = this[dataType][tokenType](arguments[1]);
        
        if (targetLocation === false) return false

        if (objToPush) targetLocation.push(objToPush)
        
        return true
    },
    getLastItemOfArr(arr) {
        return arr[arr.length-1]
    },
    concatLexeme(type, token, tempItem) {
        if (!tempItem) return new DataObj(type, token)
            
        return tempItem.clone.updateValue(tempItem.value + token)
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
                    return false
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
                    return false
                }

                return keywordObj
            },
            errorString: () => {
                logError(`${dataObj.value} : 올바른 문자열이 아닙니다!`);
                return false
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
            logError(`[Error] : 닫히지 않은 ${lastStackItem.type} 객체가 있습니다!`);
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
        const bObjKeyHasNoColon = memory[0] && rules.getLastItemOfArr(stack).type === 'object';
        if(bObjKeyHasNoColon) {
            logError(`[Error]: 콜론이 사용되지 않은 객체 표현`);
            return [false, null]
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
        // if item to update is Non-object (has 'value' property), remove all trailing whitespaces
        if (itemInMemory && itemInMemory.value) {
            itemInMemory.value = rules.removeAdditionalWhiteSpace(itemInMemory.value);
        }

        const childToAdd = rules.updateItemValue(itemInMemory);
        if (childToAdd === false) return [false, null]

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
            const bProcessResult = rules.process('array', {token, stack, memory}, 'appendElem');
            if (!bProcessResult) return [false, null]
        }
        
        const bNoObjectMismatch = rules.checkUnclosedObject(stack, 'array');
        if (!bNoObjectMismatch) return [false, null] 
        
        const arrayLexeme = stack.pop();
        return [memory, arrayLexeme]
    },
    objectOpen: ({token, stack, memory}) => rules.object.objectOpen({token, stack, memory}),
    objectClose: ({token, stack, memory}) => rules.object.objectClose({token, stack, memory}),
    appendObjKey: ({token, stack, memory}) => rules.object.appendObjKey({token, stack, memory}),
};
rules.string = {
    stringInput ({token, stack, memory}) { // Open new String data branch. If one exists already, close it.
        if ( memory[0] && memory[0].type === 'openString' ) {
            const updatedItem = rules.updateItemValue( memory.pop() );
            
            if(updatedItem === false) return [false, null]
            
            return [memory, updatedItem];
        }

        // If there are string stream left on memory and yet this function was called, 
        // assign current lexeme as errorString to log error later when append lexeme to parent array
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
        const bObjKeyHasNoColon = memory[0] && rules.getLastItemOfArr(stack).type === 'object';
        if(bObjKeyHasNoColon) {
            logError(`[Error]: 콜론이 사용되지 않은 객체 표현`);
            return [false, null]
        }

        const newObjTree = new DataObj('object').createChildArr();
        return [stack, newObjTree]
    },
    objectClose({token, stack, memory}) {
        if(memory[0]) { // append leftover element if exists
            const bProcessResult = rules.process('array', {token, stack, memory}, 'appendElem');
            if (!bProcessResult) return [false, null]
        }
        
        const bNoObjectMismatch = rules.checkUnclosedObject(stack, 'object');
        if (!bNoObjectMismatch) return [false, null]
        
        const childrenOfCurrentObj = rules.getLastItemOfArr(stack).child;
        const bNoMissingKeys = childrenOfCurrentObj.every( data => data.type === 'objectProperty');
        if (!bNoMissingKeys) {
            logError(`[Error] 키가 없는 객체 속성이 존재합니다!`);
            return [false, null]
        }
        
        const objLexeme = stack.pop();
        return [memory, objLexeme]
    },
    appendObjKey({token, stack, memory}) {
        let itemInMemory = memory.pop();
        
        // If data of itemInMemory has type of object or array, log error 
        const bItemIsObjectOrArray = itemInMemory && (itemInMemory.type === 'object' || itemInMemory.type === 'array' );
        if(bItemIsObjectOrArray) {
            logError(`[Error]: 올바르지 않은 객체 키 자료형`);
            return [false, null]
        }

        // if item to update is Non-object (has 'value' property), remove all trailing whitespaces
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
            // if item to update is Non-object (has 'value' property), remove all trailing whitespaces
            if (currentTempItem && currentTempItem.value) {
                currentTempItem.value = rules.removeAdditionalWhiteSpace(currentTempItem.value);
            }
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
        return false
    }
}




// Export to tester.js 
module.exports.arrayParser = arrayParser;
module.exports.testTarget = {
    Class_Lexer: Lexer,
    Class_DataObj: DataObj,
    Obj_rules: rules,
    Fn_logError: logError,
};