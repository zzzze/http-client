const merge = require('deepmerge')
const path = require('path')
const constants = require('./constants')

const getBaseConfig = function (configFileName, baseConfigFileName, env) {
  let commonConfig = {}
  try {
    commonConfig = require(configFileName.replace(/[^\/]*$/, constants.BASE_CONFIG_FILE_NAME))
  } catch (e) {
    // console.error('err', e)
  }
  if (typeof commonConfig === 'function') {
    commonConfig = commonConfig(env)
  }
  let baseConfig = baseConfigFileName
    ? require(baseConfigFileName)
    : commonConfig
  if (typeof baseConfig === 'function') {
    baseConfig = baseConfig(env)
  }
  return baseConfig
}

module.exports = function ({env = {}, ...options} = {}) {
  const {config: configFromCommandLine, configFileName} = options
  let configFromFile = null
  let baseConfig = getBaseConfig(configFileName, options.baseConfigFileName, env)
  configFromFile = configFileName ? require(configFileName) : {}
  if (typeof configFromFile === 'function') {
    configFromFile = configFromFile(env)
  }
  const config = merge.all([baseConfig, configFromFile, configFromCommandLine || {}])
  if ('string' === typeof config.assertionDir && configFileName) {
    let extraAssertion
    try {
      extraAssertion = require(path.join(process.env.PWD, config.assertionDir, configFileName.replace(process.env.PWD, '').replace(/^\/[^/]+/, '')))
    } catch (err) {
      extraAssertion = {}
      // console.error('Assertion not found.')
    } finally {
      config.assertion = merge(extraAssertion, config.assertion)
    }
  }
  return config
}
