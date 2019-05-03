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
    function tokenizer(str) {
        str = str.replace(/\[/g, '[, ');
        str = str.replace(/\]/g, ', ]');
        return str.split(', ');
    }

    function findLittleArray(arr) {
        const endBracket = arr.indexOf(']')
        const startBracket = arr.lastIndexOf('[', endBracket);
        return [startBracket, endBracket];
    }

    function makeElementObject(element) {
        return typeof element === 'object' ? element : { type: 'number', value: element, child: [] };
    }

    function makeArrayObject(arr, index) {
        [startBracket, endBracket] = index;
        const arrayObject = {
            type: 'array',
            child: []
        }
        for (let i = startBracket + 1; i < endBracket; i++) {
            arrayObject.child.push(makeElementObject(arr[i]));
        }
        return arrayObject;
    }

    function joinElements(arr, arrayObject, index) {
        [startBracket, endBracket] = index;
        const numberOfElements = endBracket - startBracket + 1;
        arr.splice(startBracket, numberOfElements, arrayObject);
        return arr;
    }

    function runArrayParser(arrString) {
        if (arrString.length === 1) return arrString[0];
        const arr = tokenizer(arrString);
        const index = findLittleArray(arr);
        const arrayObject = makeArrayObject(arr, index);
        arr = joinElements(arr, arrayObject, index);
        runArrayParser(arr);
    }

}