const axios = require('axios')
const vm = require('vm')
const util = require('util')
const getConfigFromFile = require('./getConfig')

module.exports = function (configFromCommandLine, configFileName, options) {
  let config = getConfigFromFile(configFromCommandLine, configFileName, options.env)
  if (options.returnConfigs) {
    console.log(config)
    return config
  }
  return axios.request(config)
    .then(res => {
      const sandbox = {
        input: res,
        output: null,
      }
      const callback = typeof options.callback === 'function'
        ? options.callback.toString()
        : options.callback || 'function (res) { return res.data }'
      const script = new vm.Script(`const func = ${callback}; output = func(input);`)
      const context = vm.createContext(sandbox)
      script.runInContext(context)
      return sandbox.output
    })
    .catch(err => console.log(err.toJSON ? err.toJSON() : err))
}
