const str = "[123, 12, [22, [3, 5], [55, 66], 4, 33], 44]";
const result = ArrayParser(str);
console.log(JSON.stringify(result, null, 2));

//result는 해당 배열을 분석한 형태이다.
//예를들어, 다음과 같은 결과일 수 있다. (꼭 아래 형태일 필요 없음)

// {
//     type: 'array',
//     child: [{ type: 'number', value: '123', child: [] },
//     { type: 'number', value: '22', child: [] },
//     { type: 'number', value: '33', child: [] }
//     ]
// }

function ArrayParser(arrString) {
    const result = {};
    const frame = {
        type: '',
        value: '',
        child: []
    }
    function tokenizer(str) {
        str = str.replace(/\[/g, '[, ');
        str = str.replace(/\]/g, ', ]');
        return str.split(', ');
    }
    // ['[', '123' , '12' , '[', '22', '[', '3', '5', ']', '[', '55', '66', ']', '4', '33', ']', '44', ']']
    if (something === '[') {
        const itme = {
            type: 'array',
            child: []
        }
    }



    // const bracketsBox = {
    //     array: "[]",
    //     object: "{}"
    // }

    // function findBrackets(onTable) {
    //     for (key in bracketsBox) {
    //         if (bracketsBox[key].includes(onTable)) return key;
    //     }
    //     return ontable;
    // }

    const toArr = arrString.split(' ');
    const waitingLine = [];
    let onTable = toArr.pop();
    waitingLine.includes();
    waitingLine.push(findBrackets(onTable));

}