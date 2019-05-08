class Node {
    constructor(type, value) {
        this.type   = type;
        this.value  = value;
        this.child  = [];
    }
}

function tokenize(string) {
    const noWhiteSpaceString = string.replace(/ /g, '');
    return noWhiteSpaceString.split(/([\[\]])|,/).filter((value) => {return value});
}


const str = "[123, 22, 33]";
tokenize(str);