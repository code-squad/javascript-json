'use strict'

function arrayParser(arrStr) { // take array in string form, return structured data in string using given array
    
    // Tokenize
    const arr = strLexer(arrStr)

    // Give proper format to parsed Array
    // const result = arr.map(`do something`);
    
    return arr
}

function strLexer(arrStr) { // take array in string form, return the array as Array    
    const updateDataStreamWithToken = {
        '[': (dataStreamArr) => {
            //console.log(`Array stream is opened - DO NOTHING`)
            return dataStreamArr
        },
        ']': (dataStreamArr) => {
            // console.log(`Array stream is closed - DO NOTHING`)
            return dataStreamArr
        },
        numberStr: (dataStreamArr, token) => {
            const lastStreamItem = dataStreamArr.pop();
            let newStreamItem = [];

            if (lastStreamItem === undefined || !lastStreamItem.hasOwnProperty('numberStr')) {
                newStreamItem.push(lastStreamItem, {'numberStr': token});
            } else {
                newStreamItem.push({'numberStr': lastStreamItem.numberStr.concat(token)});
            }

            // console.log(`A number is logged`)

            return dataStreamArr.concat(newStreamItem);
        },
        whiteSpace: (dataStreamArr) => {
            // console.log(`A whiteSpace - DO NOTHING`)
            return dataStreamArr
        },
        'elemUpdator': (dataStreamArr) => {
            const lastStreamItem = dataStreamArr.pop();
            const updatedElem = Number(lastStreamItem.numberStr);

            // console.log(`Updated preceding element with proper type`);
            return (dataStreamArr[0]) ? dataStreamArr.concat(updatedElem) : [updatedElem]
        }
    };

    function dataStreamUpdator(dataStreamArr, token, idx, arrStr) {
        const lastIdx = arrStr.length-1;
        let tokenType = token;

        if (token.match(/[0-9]/)) {
            tokenType = 'numberStr';
        } else if (token.match(/\s/)) {
            tokenType = `whiteSpace`;
        } else if (token.match(/,/) || idx === lastIdx) {
            tokenType = 'elemUpdator'
        }
        
        return updateDataStreamWithToken[tokenType](dataStreamArr, token);
    }

    return arrStr.split('').reduce(dataStreamUpdator, [])
}


// Export to tester.js 
module.exports.arrayParser = arrayParser;