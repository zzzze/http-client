const path = require('path')
const request = require('./client')

module.exports = function runRequest(program) {
  const config = (function getConfigFromCommandLine(config) {
    const result = {}
    Object.keys(config).forEach(function (key) {
      if (typeof config[key] !== 'undefined') {
        result[key] = config[key]
      }
    })
    return result
  })({
    data: program.data,
    url: program.url || program.args[0],
    headers: program.header,
    method: program.request || program.method,
  })

  const configFileName = program.config && path.join(process.env.PWD, program.config)
  const baseConfig = program.baseConfig && path.join(process.env.PWD, program.baseConfig)
  request({
    config,
    configFileName,
    env: program.env,
    baseConfigFileName: baseConfig,
    callback: program.callback,
  }).then(res => console.log(program.jsonString ? JSON.stringify(res) : res))

}
