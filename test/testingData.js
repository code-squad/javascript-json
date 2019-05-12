const correctArray = [
null,
`{
  "type": "array",
  "child": [
    {
      "type": "string",
      "value": "'1a3'"
    },
    {
      "type": "array",
      "child": [
        {
          "type": "null",
          "value": "null"
        },
        {
          "type": "boolean",
          "value": "false"
        },
        {
          "type": "array",
          "child": [
            {
              "type": "string",
              "value": "'11'"
            },
            {
              "type": "array",
              "child": [
                {
                  "type": "number",
                  "value": "112233"
                }
              ]
            },
            {
              "type": "number",
              "value": "112"
            }
          ]
        },
        {
          "type": "number",
          "value": "55"
        },
        {
          "type": "string",
          "value": "'99'"
        }
      ]
    },
    {
      "type": "number",
      "value": "33"
    },
    {
      "type": "boolean",
      "value": "true"
    }
  ]
}`,
`{
  "type": "array",
  "child": [
    {
      "type": "number",
      "value": "1"
    },
    {
      "type": "number",
      "value": "2"
    },
    {
      "type": "number",
      "value": "3"
    },
    {
      "type": "number",
      "value": "4"
    }
  ]
}`,
`{
  "type": "object",
  "child": [
    {
      "key": "color",
      "type": "string",
      "value": "'red'"
    },
    {
      "key": "sizes",
      "type": "array",
      "child": [
        {
          "type": "number",
          "value": "1"
        },
        {
          "type": "number",
          "value": "2"
        },
        {
          "type": "number",
          "value": "3"
        }
      ]
    }
  ]
}`,
`{
  "type": "array",
  "child": [
    {
      "type": "string",
      "value": "'123'"
    },
    {
      "type": "object",
      "child": [
        {
          "key": "easy",
          "type": "array",
          "child": [
            {
              "type": "string",
              "value": "'he llo'"
            },
            {
              "type": "object",
              "child": [
                {
                  "key": "a",
                  "type": "string",
                  "value": "'a'"
                }
              ]
            },
            {
              "type": "string",
              "value": "'world'"
            }
          ]
        }
      ]
    },
    {
      "type": "object",
      "child": [
        {
          "key": "a",
          "type": "number",
          "value": "123"
        },
        {
          "key": "a",
          "type": "string",
          "value": "'str'"
        },
        {
          "key": "b",
          "type": "array",
          "child": [
            {
              "type": "number",
              "value": "912"
            },
            {
              "type": "array",
              "child": [
                {
                  "type": "number",
                  "value": "5656"
                },
                {
                  "type": "number",
                  "value": "33"
                }
              ]
            },
            {
              "type": "object",
              "child": [
                {
                  "key": "key",
                  "type": "string",
                  "value": "'innervalue'"
                },
                {
                  "key": "newkeys",
                  "type": "array",
                  "child": [
                    {
                      "type": "number",
                      "value": "1"
                    },
                    {
                      "type": "number",
                      "value": "2"
                    },
                    {
                      "type": "number",
                      "value": "3"
                    },
                    {
                      "type": "number",
                      "value": "4"
                    },
                    {
                      "type": "number",
                      "value": "5"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}`
];

module.exports = {
  testingData: {
    "1": "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]",
    "2": "[1,2,3,4]",
    "3": "{color: 'red', sizes: [1,2,3]}",
    "4": "[ '123', {easy : ['he llo', {a:'a'}, 'world'] } , { a :123, a:'str', b:[ 912,[5656,33], {key : 'innervalue', newkeys: [1,2,3,4,5]} ] } ]"
  },
  result: {
    "1": correctArray[1],
    "2": correctArray[2],
    "3": correctArray[3],
    "4": correctArray[4]
  }
};
