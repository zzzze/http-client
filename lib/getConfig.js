const merge = require('deepmerge')

module.exports = function (configFilePathname, env) {
  let commonConfig = null
  let config = null

  try {
    commonConfig = require(configFilePathname.replace(/[^\/]*$/, 'config.common.js'))
    if (typeof commonConfig === 'function') {
      commonConfig = commonConfig(env)
    }
  } catch (e) {
    commonConfig = {}
  }

  try {
    config = require(configFilePathname)
    if (typeof config === 'function') {
      config = config(env)
    }
  } catch (e) {
    console.log(e)
    config = {}
  }

  return merge(commonConfig, config)
}
