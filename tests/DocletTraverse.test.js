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
            {
              longname: 'Send2.Config.Method',
              type: {
                names: [
                  '\'GET\'',
                  '\'POST\'',
                ]
              },
            }
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
            {
              longname: 'Send2.Config.Method',
              type: {
                names: [
                  '\'GET\'',
                  '\'POST\'',
                ]
              },
            }
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
            {
              longname: 'Send2.Config.Method',
              type: {
                names: [
                  '\'GET\'',
                  '\'POST\'',
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
            }
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
                {
                  longname: 'Send2.Config.Method',
                  type: {
                    names: [
                      '\'GET\'',
                      '\'POST\'',
                    ]
                  },
                }
              ]
            },
          }
        ],
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
          ]
        },
      },
    ]

    expect(() => {
      new DocletTraverse(doclets, {result: [], map: {}}).run()
    }).to.throw('Type not found: [ C, D, E ]')
  })
})
