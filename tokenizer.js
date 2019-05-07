const tokenize = (string) => {
    return string.replace(/\[/g, "\[,")
                 .replace(/\]/g, ",]")
                 .split(",")
                 .map(v => v.trim());
}

module.exports = tokenize;