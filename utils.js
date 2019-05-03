module.exports = {
    typeChecker: function(thingsToCheck) {
        if(Array.isArray(thingsToCheck)) return "array"
        if(thingsToCheck === "true" || thingsToCheck === "false") return "boolean"
        if(thingsToCheck === "null") return 'object'
        return typeof thingsToCheck
      },

    sepertorChecker: function(expectedSeperator) {
        const seperators = [',', ' ', '[', ']', ""];
        return seperators.includes(expectedSeperator)
    }
}


