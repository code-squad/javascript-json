const tokenizer = str => {
    const separator = ',';
    const temp = str.split(separator);
    const tokens = [];

    for (let value of temp) {
        let token = value.trim();
        if (token.indexOf('[') !== -1 && token.indexOf(']') !== -1) {
            tokens.push('[');
            tokens.push(token.substr(token.indexOf('[')+1, token.indexOf(']')-1));
            tokens.push(']');
        } else if (token.indexOf('[') !== -1) {
            tokens.push('[');
            tokens.push(token.substr(token.indexOf('[')+1));
        } else if (token.indexOf(']') !== -1) {
            tokens.push(token.substring(0, token.indexOf(']')));
            tokens.push(']');
        } else {
            tokens.push(token.trim());
        }
    }
    return tokens;
}

const lexer = str => {  
    const temp = tokenizer(str);
    const tokens = temp.map( token => {
        if (checkErrorToken(token)) {
            return {type: 'errorToken', value: token}
        };

        return getTypeAndToken(token);
    });
    return tokens;
}

const checkErrorToken = token => {
    const charArr = token.split('');
    let quotationMarkCnt = 0;
    [isString, isNumber] = [false, false];

    for (let char of charArr) {
        if (char === '\'')  quotationMarkCnt++;
        else if (isNaN(Number(char))) isString = true;
        else if (typeof(Number(char))) isNumber = true;
    }

    if (quotationMarkCnt > 2) {
        console.error(`${token}은 올바른 문자열이 아닙니다.`);
        return true;
    } else if (isString && isNumber && quotationMarkCnt === 0) {
        console.error(`${token}은 알 수 없는 타입입니다.`);
        return true;
    }
    return false;
}

const getTypeAndToken = token => {
    if (!isNaN(Number(token))) {
        return {type: 'number', value: Number(token)};
    } else if (token === 'true') {
        return {type: 'boolean', value: true};
    } else if (token === 'false') {
        return {type: 'boolean', value: false};
    } else if (token === 'null') {
        return {type: 'null', value: null};
    } else if (token ==='[') {
        return {type: 'leftBracket', value: token};
    } else if (token === ']') {
        return {type: 'rightBracket', value: token};
    } else if (typeof(token) === "string") {
        return {type: 'string', value: token.substring(1, token.length-1)};
    } 
}

const arrayParser = tokens => {
    let parsedArr = [];
    while (tokens.length) {
        let token = tokens.shift();
        if (token.type === 'leftBracket') {
            parsedArr.push(
                {type: 'array', child: arrayParser(tokens)}
            )
        } else if (token.type === 'rightBracket') {
            return parsedArr;
        } else {
            token.child = [];
            parsedArr.push(token);
        } 
    }
    return parsedArr;
}

const parser = str => {
    const tokens = lexer(str);
    const result = arrayParser(tokens);
    console.log(JSON.stringify(result, null, 2)); 
}

const s1 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const s2 = "['1a'3',[22,23,[11,[112233],112],55],33]";
const s3 = "['1a3',[22,23,[11,[112233],112],55],3d3]";
parser(s3);

//console.log(lexer(s3));

