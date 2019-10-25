const axios = require('axios')
const getConfigFromFile = require('./getConfig')

module.exports = function (configFromCommandLine, configFileName, options) {
  let config = getConfigFromFile(configFromCommandLine, configFileName, options.env)
  if (options.returnConfigs) return config
  return axios.request(config)
    .then(options.callback)
    .catch(err => console.log(err.toJSON ? err.toJSON() : err))
}
