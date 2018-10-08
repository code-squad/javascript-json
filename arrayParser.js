'use strict'

function arrayParser(arrStr) { // take array in string form, return structured data in string using given array
    
    // Parse string into basic Array
    const arr = basicArrParser(arrStr);

    // Parse above array into formatted data
    function analyzeItem (el) {
            const elementAnalysisObj = {
                'type': typeof el,
                'child': []
            };
            
            if (elementAnalysisObj.type === 'object' && el.length) { // If element is an array with elements inside
                elementAnalysisObj.type = 'array';
                elementAnalysisObj.child = el.map( analyzeItem );
            } else {
                elementAnalysisObj.value = el;
            }

            return elementAnalysisObj
    }
    
    return analyzeItem(arr)
}

function basicArrParser(arrStr) { // take array in string form, return the array as Array    
    const lexer = {
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
        
        return lexer[tokenType](dataStreamArr, token);
    }

    return arrStr.split('').reduce(dataStreamUpdator, [])
}


// Export to tester.js 
module.exports.arrayParser = arrayParser;