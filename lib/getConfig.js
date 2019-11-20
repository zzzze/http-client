const merge = require('deepmerge')

module.exports = function (configFromCommandLine, configFileName, {env = {}} = {}) {
  let commonConfig = null
  let configFromFile = null

  try {
    commonConfig = require(configFileName.replace(/[^\/]*$/, 'config.common.js'))
    if (typeof commonConfig === 'function') {
      commonConfig = commonConfig(env)
    }
  } catch (e) {
    commonConfig = {}
  }

  try {
    configFromFile = configFileName ? require(configFileName) : {}
    if (typeof configFromFile === 'function') {
      configFromFile = config(env)
    }
  } catch (e) {
    console.log(e)
    configFromFile = {}
  }

  return merge.all([commonConfig, configFromFile, configFromCommandLine])
}
