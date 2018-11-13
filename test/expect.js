const expect = function (data) {
    const isObject = (...args) => {
        const bObject = args.every(arg => typeof arg === 'object' && typeof arg !== 'null');

        return bObject;
    }

    return expectation = {
        toBe(value) {
            const bSame = this.toEqual(value);
            if (bSame) return console.log(`OK`);
            console.log(`FAIL (targetValue is ${value}, expectValue is ${data})`)
        },

        toEqual(value, expectValue = data) {
            if (Object.is(value, expectValue)) return true;
            if (isObject(value, expectValue)) {
                for (let key in value) {
                    if (expectValue.hasOwnProperty(key)) {
                        if (!this.toEqual(value[key], expectValue[key])) return false;
                    }
                    else {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}

exports.expect = expect;