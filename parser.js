const stack = require('./stack')

class Parser {
    constructor() {
        this.parsedResult = {};
        this.objDataFormat = {
            key: null,
            type: null,
            value: null
        };
        this.hasColonComeout = false;
    }

    parsing(lexedList) {        
        lexedList.forEach( lexedData => {
            const{type, value} = lexedData;
            if(type === 'openArray' || type === 'openObject') {
                let arrayFormat = {}
                // '[' , '{' 나올시 array 또는 object의 type을 가져옴.
                const dataType = this.getSeparatorType(type);
                // stack의 마지막 item 타입이 array이거나  undefined일 경우 array data format 생성 ex) {type: '', child: []}
                if(stack.getLastDataType() === 'array' || stack.getLastDataType() === undefined) {
                    arrayFormat = this.createOuterFormat(dataType);
                }
                // stack의 마지막 item 타입이 object일 경우 object data format 생성 ex) {key: '', type: '', value: []}
                else if(stack.getLastDataType() === 'object') {
                    this.setObjDataFormat(value, dataType)
                    arrayFormat = this.getObjDataFormat();
                }
                this.addFormatInStack(arrayFormat);
                stack.setLastDataType();
            }

            // ']', '}' 나올경우 stack에서 pop하여 stack의 앞 format의 child나 value 배열에 push. 
            // 만약 stack에 아이템이  없을경우 새로운 format의 child 배열에 push 후 최종 결과 값 설정.
            else if(type === 'closeArray' || type === 'closeObject') {
                const lastDataInStack = stack.popData();
                stack.countStack() === 0 ? this.parsedResult = this.createOuterFormat('array', lastDataInStack) : this.addDataToChild(lastDataInStack);
            }

            // separator가 아닌 data일 경우
            else {
                // object의 data인 경우 
                if(stack.getLastDataType() === 'object') {
                    if(type === 'colon') {
                        this.hasColonComeout = true;
                        return
                    } 
                    this.setObjDataFormat(value, type);
                    // key와 type, value를 모두 설정하고 colon이 나왔는지 여부로 이를 체크한 후
                    // child 또는 value 배열에 push
                    if(this.hasColonComeout) {
                        const dataFormat = this.getObjDataFormat();
                        this.addDataToChild(dataFormat);
                    }
                }

                // array의 data인 경우
                else if(stack.getLastDataType() === 'array') {
                    const dataFormat = this.createArrDataFormat(value, type);
                    this.addDataToChild(dataFormat);
                }
            }
        });
        return this.parsedResult;
    }

    getSeparatorType(type) {
        if(type === 'openArray') return 'array'
        else if(type === 'openObject') return 'object';
    }

    createOuterFormat(type, allItems) {
        const outerFormat = {
            type: type,
            child: []
        }
        if(allItems) outerFormat.child.push(allItems)
        return outerFormat
    }
    addFormatInStack(arrayFormat) {
        stack.appendInStack(arrayFormat);
    }

    addDataToChild(lexedData) {
        stack.appendInPreviousData(lexedData);
    }

    createArrDataFormat(value, type) {
        return {
            type,
            value
        };
    }

    setObjDataFormat(value, type) {
        // object가 stack에 올라간 이후 this.objDataFormat의 key값이 없을 때 먼저 key값을 설정.
        if(this.objDataFormat.key === null) this.objDataFormat.key = value;
        // key값이 설정되어 있고 콜론도 나온 이후에는 value와 type값을 설정.
        else if(this.objDataFormat.key && this.hasColonComeout) {
            // type값은 인자로 받은 그대로 설정
            this.objDataFormat.type = type;
            // value값에 객체나 배열이 설정될 경우
            if(value === '[' || value === '{') this.objDataFormat.value = [];
            // data가 설정될경우
            else {
                this.objDataFormat.value = value;
            }
        }
    }

    getObjDataFormat() {
        const copyFormat = Object.assign({}, this.objDataFormat);
        this.clearObjDataFormat();
        this.hasColonComeout = false;
        return copyFormat;
    }

    clearObjDataFormat() {
        for(const key in this.objDataFormat) {
            this.objDataFormat[key] = null;
        }
    }
}

module.exports = Parser