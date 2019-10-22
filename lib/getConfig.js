const merge = require('deepmerge')
const path = require('path')

module.exports = function (configName, env) {
  let commonConfig = {}
  try {
    commonConfig = require(path.resolve(__dirname, `../configs/${configName.replace(/[^\/]*$/, 'config.common.js')}`))
    if (typeof commonConfig === 'function') {
      commonConfig = commonConfig(env)
    }
  } catch (e) {
    // pass
  }
  let config = require(path.join(__dirname, `../configs/${configName}`))
  if (typeof config === 'function') {
    config = config(env)
  }
  return merge(commonConfig, config)
}
