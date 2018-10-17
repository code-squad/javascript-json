exports.testCaseList = [
  {
    name: '기본 배열 데이터 분석',
    input: '[123, 22, 33]',
    output: {
      type: 'array',
      child: [
        {
          type: 'number',
          value: 123
        },
        {
          type: 'number',
          value: 22
        },
        {
          type: 'number',
          value: 33
        }
      ]
    }
  },
  {
    name: '2중 중첩 배열 데이터 분석',
    input: '[123,[22],33, [1,2,3,4,5]]',
    output: {
      type: 'array',
      child: [
        {
          type: 'number',
          value: 123
        },
        {
          type: 'array',
          child: [
            {
              type: 'number',
              value: 22
            }
          ]
        },
        {
          type: 'number',
          value: 33
        },
        {
          type: 'array',
          child: [
            {
              type: 'number',
              value: 1
            },
            {
              type: 'number',
              value: 2
            },
            {
              type: 'number',
              value: 3
            },
            {
              type: 'number',
              value: 4
            },
            {
              type: 'number',
              value: 5
            }
          ]
        }
      ]
    }
  },
  {
    name: '무한 중첩 배열 데이터 분석',
    input: '[123,[22,23,[11,[112233],112],55],33]',
    output: {
      type: 'array',
      child: [
        {
          type: 'number',
          value: 123
        },
        {
          type: 'array',
          child: [
            {
              type: 'number',
              value: 22
            },
            {
              type: 'number',
              value: 23
            },
            {
              type: 'array',
              child: [
                {
                  type: 'number',
                  value: 11
                },
                {
                  type: 'array',
                  child: [
                    {
                      type: 'number',
                      value: 112233
                    }
                  ]
                },
                {
                  type: 'number',
                  value: 112
                }
              ]
            },
            {
              type: 'number',
              value: 55
            }
          ]
        },
        {
          type: 'number',
          value: 33
        }
      ]
    }
  },
  {
    name: '여러가지 타입 지원 배열 데이터 분석',
    input: `['1a3',[null,false,['11',[112233],112],55, '99'],33, true]`,
    output: {
      type: 'array',
      child: [
        {
          type: 'string',
          value: '1a3'
        },
        {
          type: 'array',
          child: [
            {
              type: 'null',
              value: null
            },
            {
              type: 'boolean',
              value: false
            },
            {
              type: 'array',
              child: [
                {
                  type: 'string',
                  value: '11'
                },
                {
                  type: 'array',
                  child: [
                    {
                      type: 'number',
                      value: 112233
                    }
                  ]
                },
                {
                  type: 'number',
                  value: 112
                }
              ]
            },
            {
              type: 'number',
              value: 55
            },
            {
              type: 'string',
              value: '99'
            }
          ]
        },
        {
          type: 'number',
          value: 33
        },
        {
          type: 'boolean',
          value: true
        }
      ]
    }
  }
]