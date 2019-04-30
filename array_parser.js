const ArrayParser = (str) => {
    const parseArray = JSON.parse(str);
    return parseArray.reduce( (prevObj, currentValue) => {
        prevObj['child'].push({ type : 'number', value : currentValue, child : [] } );
        return prevObj;
    }, { type : 'array', child : [] } );
}

module.exports = ArrayParser;