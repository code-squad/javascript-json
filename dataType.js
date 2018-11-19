class DataType{
    constructor(error){
        this.error = error;
    }
    check(data){
        if(data === '') return;
        if(this.isBoolean(data)) return 'boolean';
        if(this.isNumber(data)) return 'number';
        if(this.isNull(data)) return 'null';
        if(this.isString(data)) {
            if(!this.error.validateString(data)) return 'string';            
        }
        this.error.validateOther(data);
    }
    isString(value){
        return value.includes("'") | value.includes('"');
    }
    isBoolean(value){
        return value === 'true' || value === 'false';
    }
    isNull(value){
        return value === 'null';
    }
    isNumber(value){
        return !isNaN(value);
    }
}

class Error{
    validateString(value){
        if(!value.match(/^\'/)) throw "문자열의 시작은 '이어야 합니다.";
        if(!value.match(/\'$/)) throw "문자열의 끝은 '이어야 합니다.";
        if((value.match(/\'/g) || []).length > 2) throw "문자열 안에 '이 포함되지 않아야 합니다.";
    }
    validateOther(value){
        if(value.match(/[a-z][0-9]/gi)) throw "숫자 안에 문자가 들어갈 수 없습니다.";
        throw "잘못된 문자열입니다.";
    }
}

const dataType = new DataType(new Error());
module.exports = dataType;