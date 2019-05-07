const ArrayParser = require('./array_parser');

(() => {
    const str1 = "[15, 9, [7, 5], 2, [999, 11, [3, 8]], 25]";
    const str2 = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
    const str3 = "[123, 22, 33]";
    //const str4 = "['1a'3',[22,23,[11,[112233],112],55],33]";    // error 예제 1
    //const str5 = "['1a3',[22,23,[11,[112233],112],55],3d3]";    // error 예제 2
    
    const result1 = ArrayParser(str1);
    const result2 = ArrayParser(str2);
    const result3 = ArrayParser(str3);
    //const result4 = ArrayParser(str4);  // error
    //const result5 = ArrayParser(str5);  // error
    
    console.log(JSON.stringify(result1, null, 2));
    console.log(JSON.stringify(result2, null, 2));
    console.log(JSON.stringify(result3, null, 2));
    //console.log(JSON.stringify(result4, null, 2));   // error
    //console.log(JSON.stringify(result5, null, 2));   // error
})();