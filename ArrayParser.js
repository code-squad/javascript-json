const str = "[123, 12, [22, [3, 5], [55, 66], 4, 33], 44]";

class ArrayParser {
    tokenizer(arr) {
        return arr.replace(/(\[)|(\])/g, (match, p1, p2) => {
            if (p1) return '[,';
            if (p2) return ',]';
        }).split(',')
            .map(x => x.trim());
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

        return arr.reduce((acc, cur, index) => {
            if (index > startBracket && index < endBracket) {
                acc.child.push(this.makeElementObject(cur));
            }
            return acc;
        }, arrayObject);
    }

    joinElements(arr, arrayObject, index) {
        const [startBracket, endBracket] = index;
        const numberOfElements = endBracket - startBracket + 1;
        arr.splice(startBracket, numberOfElements, arrayObject);
        return arr;
    }

    runArrayParser(arr) {
        if (arr.length === 1) return arr[0];
        const indexList = this.findLittleArray(arr);
        const arrayObject = this.makeArrayObject(arr, indexList);
        arr = this.joinElements(arr, arrayObject, indexList);
        return this.runArrayParser(arr);
    }

    start(str) {
        const arr = this.tokenizer(str);
        return this.runArrayParser(arr);
    }
}

const arrayParser = new ArrayParser();
// "[123, 12, [22, [3, 5], [55, 66], 4, 33], 44]"
console.log(arrayParser.start(str));