class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const array = '[123,"hallo",33]'

function arrayParser(array) {
    str = array.replace(/ /gi, "");
    let type = getType(str)
    let value = getValue(str)
    let child = getChild(value)
    let result = new JSONData(type, value, child)
    printResult(result)
}

function getType(str) {
    if (str.indexOf('[') === -1) {
        if (!isNaN(str)) {
            return 'number';
        } else {
            return 'string';
        }
    } else {
        return 'array '
    }
};

function getValue(str) {
    if (str.indexOf('[') !== -1) {
        return str.slice(str.indexOf('[') + 1, str.lastIndexOf(']'))
    } else {
        return str.slice(0, str.length)
    }
}

function getChild(str) {
    child = []
    while (str.indexOf(',') !== -1) {
        var value = str.slice(0, str.indexOf(','))
        child.push(new JSONData(getType(value), value, []))
        str = str.slice(str.indexOf(',') + 1, str.length)
        if (str.indexOf(',') === -1) {
            child.push(new JSONData(getType(str), str, []))
        }
        console.log(str)
    }
    return child
}

function printResult(result) {
    console.log(result)
}

arrayParser(array)
