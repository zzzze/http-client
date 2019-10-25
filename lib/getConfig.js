const merge = require('deepmerge')

module.exports = function (configFromCommandLine, configFileName, env = {}) {
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
    configFromFile = require(configFileName)
    if (typeof config === 'function') {
      config = config(env)
    }
  } catch (e) {
    console.log(e)
    config = {}
  }

  return merge.all([commonConfig, configFromFile, configFromCommandLine])
}
