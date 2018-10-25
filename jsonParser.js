class JSONData {
    constructor(type, value, child) {
        this.type = type
        this.value = value
        this.child = child
    }
}

const array = '[123,22,33]'

function arrayParser(str) {
    const type = getType(str);
    const value = getValue(str);
    const child = getChild(str);
    const jsonData = new JSONData(type, value, child)
    console.log(jsonData)
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
    
}

function getChild(str) {

}