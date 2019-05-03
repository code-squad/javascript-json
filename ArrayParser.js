const str = "[123, 12, [22, [55, 66], 4, 33], 44]";

class ArrayParser {
    tokenizer(arr) {
        arr = arr.split(' ').join(''); // arr = arr.replace(/ /g, '');
        arr = arr.replace(/\[/g, '[,');
        arr = arr.replace(/\]/g, ',]');
        return arr.split(',');
    }

    findLittleArray(arr) {
        const endBracket = arr.indexOf(']')
        const startBracket = arr.lastIndexOf('[', endBracket);
        return [startBracket, endBracket];
    }

    makeElementObject(element) {
        return { type: 'number', value: element, child: [] };
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
}
