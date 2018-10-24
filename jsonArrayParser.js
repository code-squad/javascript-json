// arrayParser step1

const arrayParser = {

    result: {
        child: []
    },

    getResultAnalyzed(str) {
        this.checkStrType(str);
        this.extractNumber(str);
        return this.result;
    },

    checkStrType(str) {
        if (str[0] === '[' && str[str.length - 1] === ']')
            this.result.type = 'Array';
    },

    extractNumber(str) {
        let stringNum = "";
        for (let ele of str) {
            if (!isNaN(Number(ele))) stringNum += ele;
            if (ele === "," || ele === "]") {
                this.analyzeStrNum(stringNum);
                stringNum = "";
            }
        }
    },

    analyzeStrNum(stringNum) {
        const childObj = {};
        childObj.type = typeof Number(stringNum);
        childObj.value = stringNum;
        childObj.child = [];
        this.result.child.push(childObj);
    },

} // end arrayParser 

const str = '[12,345,6789]';
let result = arrayParser.getResultAnalyzed(str);
console.log(JSON.stringify(result, null, 2));