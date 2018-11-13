const expect = function (data) {
    const isObject = (...args) => {
        const bObject = args.every(arg => typeof arg === 'object' && typeof arg !== 'null');
        return bObject;
    }

    return expectation = {
        toBe(value) {
            const bSame = this.toEqual(value);
            if (bSame) return console.log(`OK`);
            console.log(`FAIL (targetValue is ${JSON.stringify(value)}, expectValue is ${JSON.stringify(data)})`)
        },

        toEqual(value, expectValue = data) {
            if (Object.is(value, expectValue)) return true;

            if (isObject(value, expectValue)) {
                for (let key in value) {
                    if (!expectValue.hasOwnProperty(key)) return false;
                    if (!this.toEqual(value[key], expectValue[key])) return false;
                }
                return true;
            }
        }
    }
}

exports.expect = expect;