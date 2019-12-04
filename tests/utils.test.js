const chai = require('chai')
const utils = require('../src/utils')
let expect = chai.expect

describe('utils', () => {
  describe('getAttr', () => {
    const testCases = [
      {
        input: {a: {b: 10}},
        output: 10,
        path: 'a.b',
      }, {
        input: {a: {b: {c: 10}}},
        output: {c: 10},
        path: 'a.b',
      }, {
        input: {a: {b: {c: 10}}},
        output: 10,
        path: 'a[b].c',
      }, {
        input: {a: {b: {c: 10}}},
        output: undefined,
        path: 'a.b.c.d',
      }
    ]
    testCases.forEach((testCase, index) => {
      it('getAttr - ' + index, () => {
        expect(utils.getAttr(testCase.input, testCase.path)).to.be.deep.equal(testCase.output)
      })
    })
  })


  describe('setAttr', () => {
    const testCases = [
      {
        input: {a: {b: {}}},
        output: {a: 10},
        path: 'a',
        value: 10,
      }, {
        input: {a: {b: {}}},
        output: {a: {b: {c: 10}}},
        path: 'a.b.c',
        value: 10,
      }, {
        input: {a: {b: {}}},
        output: {a: {b: {c: {test: 10}}}},
        path: 'a.b.c',
        value: {test: 10},
      }, {
        input: {a: {b: {}}},
        output: {a: {b: {c: {test: 10}}}},
        path: 'a.b.c.test',
        value: 10,
      }, {
        input: {a: {b: {}}},
        output: {a: {b: {c: {test: 10}}}},
        path: 'a.b[c].test',
        value: 10,
      }
    ]
    testCases.forEach((testCase, index) => {
      it('setAttr - ' + index, () => {
        utils.setAttr(testCase.input, testCase.path, testCase.value, testCase.mergeObject)
        expect(testCase.input).to.be.deep.equal(testCase.output)
      })
    })
    it('setAttr - merge value', () => {
      let obj = {a: {b: {}}}
      utils.setAttr(obj, 'a.b.c.d.f', 10)
      utils.setAttr(obj, 'a.b.c', {test: 10})
      expect(obj).to.be.deep.equal({a: {b: {c: {test: 10, d: {f: 10}}}}})
    })
  })
})
