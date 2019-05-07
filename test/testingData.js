const resultArrayParsing1 =
`{
  "type": "array",
  "child": [
    {
      "type": "string",
      "value": "'1a3'",
      "child": []
    },
    {
      "type": "array",
      "child": [
        {
          "type": "null",
          "value": "null",
          "child": []
        },
        {
          "type": "boolean",
          "value": "false",
          "child": []
        },
        {
          "type": "array",
          "child": [
            {
              "type": "string",
              "value": "'11'",
              "child": []
            },
            {
              "type": "array",
              "child": [
                {
                  "type": "number",
                  "value": "112233",
                  "child": []
                }
              ]
            },
            {
              "type": "number",
              "value": "112",
              "child": []
            }
          ]
        },
        {
          "type": "number",
          "value": "55",
          "child": []
        },
        {
          "type": "string",
          "value": "'99'",
          "child": []
        }
      ]
    },
    {
      "type": "number",
      "value": "33",
      "child": []
    },
    {
      "type": "boolean",
      "value": "true",
      "child": []
    }
  ]
}`;

const resultArrayParsing2 =
`{
  "type": "array",
  "child": [
    {
      "type": "number",
      "value": "1",
      "child": []
    },
    {
      "type": "number",
      "value": "2",
      "child": []
    },
    {
      "type": "number",
      "value": "3",
      "child": []
    },
    {
      "type": "number",
      "value": "4",
      "child": []
    }
  ]
}`;

const resultObjParsing1 =
`{
  "type": "object",
  "child": [
    {
      "type": "number",
      "value": "1",
      "child": []
    },
    {
      "type": "number",
      "value": "2",
      "child": []
    },
    {
      "type": "number",
      "value": "3",
      "child": []
    }
  ]
}`;

module.exports = {
  data: {
    "1": "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]",
    "2": "[1,2,3,4]",
    "3": "{1,2,3}"
  },
  result: {
    "1": resultArrayParsing1,
    "2": resultArrayParsing2,
    "3": resultObjParsing1
  }
}