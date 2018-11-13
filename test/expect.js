const expect = function (data) {
    const expectValue = data;

    return expectation = {
        //primitive value comparison
        toBe(value) {
            const bSame = Object.is(expectValue, value);

            if (bSame) {
                console.log(`OK`);
                return;
            }

            console.log(`FAIL (targetValue is ${value}, expectValue is ${expectValue})`)
        },
        //deep cloning for testing object
        toEqual(value, data) {
            const expectValue = data;
            let bSame = false;

            if (typeof value === 'object' && typeof value !== 'null') {
                for (let key in value) {
                    if (value.hasOwnProperty(key) && expectValue.hasOwnProperty(key)) {
                        if (value[key] === expectValue[key]) {
                            bSame = true;
                        }
                        if (typeof value[key] === 'object' && typeof value[key] !== 'null') {
                            bSame = toEqual(value[key], expectValue[key]);
                        }
                    } else {
                        bSame = false;
                    }
                }
                return bSame;
            }
        }
    }
}

exports.expect = expect;