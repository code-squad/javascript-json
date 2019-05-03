const str = "[123, 12, [22, [3, 5], [55, 66], 4, 33], 44]";

//result는 해당 배열을 분석한 형태이다.
//예를들어, 다음과 같은 결과일 수 있다. (꼭 아래 형태일 필요 없음)

// {
//     type: 'array',
//     child: [{ type: 'number', value: '123', child: [] },
//     { type: 'number', value: '22', child: [] },
//     { type: 'number', value: '33', child: [] }
//     ]
// }

class ArrayParser {
    tokenizer(arr) {
        let newArr = arr.replace(/\[/g, '[, ');
        let newArr2 = newArr.replace(/\]/g, ', ]');
        return newArr2.split(', ');
    }

    findLittleArray(arr) {
        const endBracket = arr.indexOf(']')
        const startBracket = arr.lastIndexOf('[', endBracket);
        return [startBracket, endBracket];
    }

    makeElementObject(element) {
        return typeof element === 'object' ? element : { type: 'number', value: element, child: [] };
    }

    makeArrayObject(arr, index) {
        const [startBracket, endBracket] = index;
        const arrayObject = {
            type: 'array',
            child: []
        }
        for (let i = startBracket + 1; i < endBracket; i++) {
            arrayObject.child.push(this.makeElementObject(arr[i]));
        }
        return arrayObject;
    }

    joinElements(arr, arrayObject, index) {
        const [startBracket, endBracket] = index;
        const numberOfElements = endBracket - startBracket + 1;
        arr.splice(startBracket, numberOfElements, arrayObject);
        return arr;
    }

    start(str) {
        const arr = this.tokenizer(str);
        return this.runArrayParser(arr);
    }

    runArrayParser(arr) {
        if (arr.length === 1) return arr[0];
        const index = this.findLittleArray(arr);
        const arrayObject = this.makeArrayObject(arr, index);
        arr = this.joinElements(arr, arrayObject, index);
        return this.runArrayParser(arr);
    }

}

const arrayParser = new ArrayParser();
// "[123, 12, [22, [3, 5], [55, 66], 4, 33], 44]"
console.log(arrayParser.start(str));