const merge = require('deepmerge')
const path = require('path')

const getBaseConfig = function (configFileName, baseConfigFileName, env) {
  let commonConfig = {}
  try {
    commonConfig = require(configFileName.replace(/[^\/]*$/, 'config.common.js'))
  } catch (e) {}
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
    try {
      config.assertion = require(path.join(process.env.PWD, config.assertionDir, configFileName.replace(process.env.PWD, '').replace(/^\/[^/]+/, '')))
    } catch (err) {
      throw new Error('Assertion not found.')
    }
  }
  return config
}
