const axios = require('axios')
const getConfig = require('./getConfig')

module.exports = function (configName, env) {
  let config = getConfig(configName, env)
  return axios.request(config)
}
