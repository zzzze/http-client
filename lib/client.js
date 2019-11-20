const axios = require('axios')
const vm = require('vm')
const util = require('util')
const getConfigFromFile = require('./getConfig')
const genCallback = require('./genCallback')

module.exports = function (options) {
  const {config: configFromCommandLine, configFileName} = options
  let config = getConfigFromFile(configFromCommandLine, configFileName, options)
  return axios.request(config)
    .then(res => {
      const sandbox = {
        input: res,
        output: null,
      }
      const callback = genCallback(options.callback)
      const script = new vm.Script(`const func = ${callback}; output = func(input);`)
      const context = vm.createContext(sandbox)
      script.runInContext(context)
      return sandbox.output
    })
    .catch(err => console.log(err.toJSON ? err.toJSON() : err))
}
