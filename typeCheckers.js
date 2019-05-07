module.exports = {
    getType: function (thingsToCheck) {
      if (Array.isArray(thingsToCheck)) return "array"
      if (thingsToCheck === "true" || thingsToCheck === "false") return "boolean"
      if (thingsToCheck === "null") return 'object'
      if (isNaN(thingsToCheck * 1)) return 'string'
      if (!isNaN(Number(thingsToCheck * 1))) return 'number'
    },
  
    sepertorChecker: function (expectedSeperator) {
      const seperators = [',', ' ', '[', ']', ""];
      return seperators.includes(expectedSeperator)
    }
  }