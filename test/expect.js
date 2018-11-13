const expect = function (data) {
    const expectValue = data;

    return expectation = {
        toBe(value) {
            const bSame = this.toEqual(value);
            if (bSame) return console.log(`OK`);
            console.log(`FAIL (targetValue is ${value}, expectValue is ${expectValue})`)
        },

        toEqual(value) {
            let bSame = Object.is(value, expectValue);

            if (bSame) return true;

            if (typeof value === 'object' && typeof expectValue === 'object') {
                for (let key in value) {
                    if (value.hasOwnProperty(key) && expectValue.hasOwnProperty(key)) {
                        if (Object.is(value[key], expectValue[key])) {
                            bSame = true;
                        }
                        if (typeof value[key] === 'object' && typeof value[key] !== 'null') {
                            bSame = toEqual(value[key], expectValue[key]);
                        }
                        else {
                            bSame = false;
                        }
                    }
                    else {
                        bSame = false;
                    }
                }
            }
            return bSame;
        }
    }
}

exports.expect = expect;