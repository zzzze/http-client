const chai = require('chai')
const DocletTraverse = require('../src/client/DocletTraverse')
let expect = chai.expect

const testCases = [
  // 0
  {
    input: [
      {
        type: {
          names: [
            'Send2.Config.Method',
            'Send2.Config.Method2'
          ]
        },
      },
    ],
    output: [
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
      },
    ],
  },

  // 2
  {
    input: [
      {
        type: {
          names: [
            'Send2.Config.Method',
            'Send2.Config.Url'
          ]
        },
      },
    ],
    output: [
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
            }, {
              longname: 'Send2.Config.Url',
              type: {
                names: [
                  'string',
                ]
              },
            }
          ]
        },
      },
    ],
  },

]

describe('DocletTraverse -  property', () => {
  testCases.forEach((testCase, index) => {
    it('DocletTraverse - ' + index, () => {
      const context = {
        result: [],
        map: {
          'Send2.Config.Method2': {
            longname: 'Send2.Config.Method2',
            type: {
              names: [
                '\'PUT\'',
                '\'DELETE\'',
              ]
            },
          },
          'Send2.Config.Method': {
            longname: 'Send2.Config.Method',
            type: {
              names: [
                '\'GET\'',
                '\'POST\'',
              ]
            },
          },
        },
      }
      let traverse = new DocletTraverse(testCase.input, context)
      traverse.run({check: false})
      traverse.emit('type-Send2.Config.Url', {
        longname: 'Send2.Config.Url',
        type: {
          names: [
            'string',
          ]
        },
      })
      expect(context.result).to.be.deep.equal(testCase.output)
    })
  })

  it('should throw error', () => {
    const doclets = [
      {
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
    }).to.throw('Type not found: [C, D, E]')
  })
})
