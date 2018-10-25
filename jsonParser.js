class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const array = '[123,22,33]'

function arrayParser(array) {
    str = array.replace(/ /gi, "");

}

function getType(str) {
    if(str.indexOf('[') === -1) {
        if(!isNaN(str)) {
            return 'number';
        } else {
            return 'string';
        }
    } else {
        return 'array'
    }
};

function getValue(str) {
    if(str.indexOf('[') !== 0) {
        return str.slice(0, str.lastIndexOf(']'))
    } else {
        return str.slice(0, str.indexOf(','))
    }
}

function getChild(str) {
    
}