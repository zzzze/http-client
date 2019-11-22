const glob = require('glob')
const path = require('path')
const chai = require('chai')
const chaiSubset = require('chai-subset')
const send2 = require('./client')
const expect = chai.expect
chai.use(chaiSubset)

describe('Test', () => {
  const configs = glob.sync(path.join(process.env.PWD, './configs/**/*.js'))
  configs.forEach(configFileName => {
    it(configFileName, () => {
      return send2({
        configFileName: path.resolve(process.env.PWD, configFileName),
        baseConfigFileName: process.env.BASE_CONFIG ? path.resolve(process.env.PWD, process.env.BASE_CONFIG) : '',
        callback: (res, config) => {
          const particalRes = { status: res.status, data: res.data }
          if (config.assertion && 'string' !== typeof config.assertion) {
            switch (config.assertion.type) {
              case 'deep-equal':
                expect(particalRes).to.be.deep.equal(config.assertion.expected)
                break
              case 'partical-equal':
                expect(particalRes).containSubset(config.assertion.expected)
                break
              case 'equal':
                expect(particalRes).to.be.equal(config.assertion.expected)
                break
              default:
                expect(particalRes).containSubset({
                  status: value => value < 400 && value >= 200
                })
            }
          } else {
            console.log('"assertion" not found. Skip this test.')
          }
        }
      })
    })
  })
})
