const array = '[1,2]'

function getBrackets(array) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] === '[') {
            console.log(array[i])
        } else if(array[i] === ']') {
            console.log(array[i])
        }
    }
}

getBrackets(array)