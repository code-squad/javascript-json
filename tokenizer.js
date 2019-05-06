const tokenize = (string) => {
    return string.replace(/\[/g, "\[,").replace(/\]/g, ",]").split(",");
}
