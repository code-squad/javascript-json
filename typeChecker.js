//
function isQuote (value) {
    return value === "\'" || value === "\""
}

function isBraket (value){
    return value === "[" || value === "]"
}

function isComma (value){
    return value === ","
}

function isWhiteSpace (value){
    return /\s/.test(value);
}

// Returns if a value is really a number
function isNumber (value) {
    return /[0-9]/.test(value);
}

// Returns if a value is a string
function isString (value) {
    return /[a-z]/i.test(value)
}


// Returns if a value is null
function isNull (value) {
    return value === 'null';
}

// Returns if a value is undefined
function isUndefined (value) {
    return value === 'undefined';
}

// Returns if a value is a boolean
function isBoolean (value) {
    return value === 'true' || value === "false";
}

