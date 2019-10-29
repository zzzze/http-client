const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const proxyquire = require('proxyquire').noPreserveCache()
const chaiSubset = require('chai-subset')
const testCases = require('./test-cases')
let expect = chai.expect

chai.use(sinonChai)
chai.use(chaiSubset)

describe('Command line test', () => {
  let requestStub, argvStub, consoleLogSoy

  function runCommand(command) {
    const argv = command
      .replace(/\\"/g, '#@_=')
      .match(/\s?"[^"]*"\s?|[^\s]*\s?/g)
      .reduce((result, str) => {
        if (str) {
          result.push(str.replace(/#@_=/g, '\"').replace(/^"|"\s?$/g, '').trim())
        }
        return result
      }, [])
    argvStub.value([].concat(['node'], argv))
    proxyquire('../../bin/client', {
      '../lib/client': requestStub,
    })
  }

  beforeEach(() => {
    requestStub = sinon.stub().resolves()
    argvStub = sinon.stub(process, 'argv')
    consoleLogSpy = sinon.stub(console, 'log')
  })

  afterEach(() => {
    // clear cache expect tests folder.
    Object.keys(require.cache).map(function (key) {
      if (!/\/tests\//.test(key)) {
        delete require.cache[key]
      }
    })
    argvStub.restore()
    consoleLogSpy.restore()
  })

  testCases.forEach(testCase => {
    it(`Test - ${testCase.input}`, () => {
      runCommand(testCase.input)
      expect(requestStub.getCall(0).args).containSubset(testCase.output)
    })
  })
})
