const chai = require('chai')
const DocletTraverse = require('../src/client/DocletTraverse')
let expect = chai.expect

const testCases = [
  // 0
  {
    input: [
      {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            'Send2.Config.Method'
          ]
        },
      }, {
        undocumented: true,
        longname: 'config',
        type: {
          names: [
            'Send2.Config.Method'
          ]
        },
      },
    ],
    output: [
      {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      },
    ],
  },

  // 1
  {
    input: [
      {
        longname: 'config',
        type: {
          names: [
            'Send2.Config.Method'
          ]
        },
      }, {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      },
    ],
    output: [
      {
        longname: 'config',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      },
    ],
  },

  // 2
  {
    input: [
      {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            'Send2.Config.Method',
            'Send2.Config.Method2',
          ]
        },
      }, {
        longname: 'Send2.Config.Method2',
        type: {
          names: [
            '\'PUT\'',
            '\'DELETE\'',
          ]
        },
      },
    ],
    output: [
      {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
            '\'PUT\'',
            '\'DELETE\'',
          ]
        },
      }, {
        longname: 'Send2.Config.Method2',
        type: {
          names: [
            '\'PUT\'',
            '\'DELETE\'',
          ]
        },
      },
    ],
  },

  // 3
  {
    input: [
      {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            '\'POST\'',
          ]
        },
        properties: [
          {
            type: {
              names: [
                'Send2.Config.Method'
              ]
            },
          }
        ],
      },
    ],
    output: [
      {
        longname: 'Send2.Config.Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            '\'POST\'',
          ]
        },
        properties: [
          {
            type: {
              names: [
                '\'GET\'',
                '\'POST\'',
              ]
            },
          }
        ],
      },
    ],
  },

  // 4
  {
    input: [
      {
        longname: 'Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
            'Method1',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            'Method'
          ]
        },
      }, {
        longname: 'Method1',
        type: {
          names: [
            '\'PUT\'',
            'Method2'
          ]
        },
      }, {
        longname: 'Method2',
        type: {
          names: [
            '\'DELETE\'',
          ]
        },
      },
    ],
    output: [
      {
        longname: 'Method',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
            '\'PUT\'',
            '\'DELETE\'',
          ]
        },
      }, {
        longname: 'config',
        type: {
          names: [
            '\'GET\'',
            '\'POST\'',
            '\'PUT\'',
            '\'DELETE\'',
          ]
        },
      }, {
        longname: 'Method1',
        type: {
          names: [
            '\'PUT\'',
            '\'DELETE\'',
          ]
        },
      }, {
        longname: 'Method2',
        type: {
          names: [
            '\'DELETE\'',
          ]
        },
      },
    ],
  },
]

describe('DocletTraverse', () => {
  testCases.forEach((testCase, index) => {
    it('DocletTraverse - ' + index, () => {
      const context = {
        result: [],
      }
      new DocletTraverse(testCase.input, context).run()
      expect(context.result).to.be.deep.equal(testCase.output)
    })
  })


  it('should throw error', () => {
    const doclets = [
      {
        longname: 'A',
        type: {
          names: [
            'boolean',
            'C',
            'D',
            'Number',
            1,
            'String',
          ]
        },
      }, {
        longname: 'B',
        type: {
          names: [
            'object',
            'string',
            'E',
            '"abc"',
            2,
          ]
        },
      },
    ]

    expect(() => {
      new DocletTraverse(doclets, {result: [], map: {}}).run()
    }).to.throw('Type not found: [ C, D, E ]')
  })
})
