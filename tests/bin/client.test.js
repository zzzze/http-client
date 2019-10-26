const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire')
const chaiSubset = require('chai-subset')
const testCases = require('./test-cases')
let expect = chai.expect

chai.use(sinonChai)
chai.use(chaiSubset)

describe('Command line test', () => {
  let requestSpy, argvStub

  function runCommand(command) {
    const argv = command
      .replace(/\\"/g, '#@_=')
      .match(/\s?"[^"]*"\s?|[^\s]*\s?/g)
      .reduce((result, str) => {
        if (str) {
          result.push(str.replace(/#@_=/g, '\"').replace(/^"|"$/g, '').trim())
        }
        return result
      }, [])
    argvStub.value([].concat(['node'], argv))
    proxyquire('../../bin/client', {
      '../lib/client': requestSpy,
    })
  }

  beforeEach(() => {
    requestSpy = sinon.spy()
    argvStub = sinon.stub(process, 'argv')
  })

  afterEach(() => {
    argvStub.restore()
  })

  testCases.forEach(testCase => {
    it(`Test - ${testCase.input}`, () => {
      runCommand(testCase.input)
      expect(requestSpy.getCall(0).args).containSubset(testCase.output)
    })
  })
})
