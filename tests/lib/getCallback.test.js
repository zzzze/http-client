const chai = require('chai')
const proxyquire = require('proxyquire').noPreserveCache()
const genCallback = require('../../lib/genCallback')
let expect = chai.expect

describe('genCallback', () => {
  it('Called with function', () => {
    const func = function() { console.log('xxx') }
    const callback = genCallback(func)
    expect(callback).to.be.equal(func.toString())
  })

  it('Called with function string', () => {
    const func = 'function() { console.log(\'xxx\') }'
    const callback = genCallback(func)
    expect(callback).to.be.equal(func)
  })

  it('Called with only return statement', () => {
    const func = 'res.data'
    const callback = genCallback(func)
    expect(callback).to.be.equal('function (res) { return res.data }')
  })

  it('Called with undefined', () => {
    const callback = genCallback()
    expect(callback).to.be.equal('function (res) { return res.data }')
  })
})
