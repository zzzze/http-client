const axios = require('axios')
const vm = require('vm')
const util = require('util')
const getConfigFromFile = require('./getConfig')
const genCallback = require('./genCallback')
const chai = require('chai')
let expect = chai.expect

module.exports = function (options) {
  let config = getConfigFromFile(options)
  return axios.request({
    ...config,
    validateStatus: () => true,
  })
    .then(res => {
      const sandbox = {
        input: {
          res,
          config,
        },
        output: null,
      }
      if ('function' === typeof options.callback) {
        return options.callback(res, config)
      }
      const callback = genCallback(options.callback)
      const script = new vm.Script(`const func = ${callback}; output = func(input.res, input.config);`)
      const context = vm.createContext(sandbox)
      script.runInContext(context)
      return sandbox.output
    }, err => {
      console.log(err.toJSON ? err.toJSON() : err)
    })
}
