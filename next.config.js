const path = require('path')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    if (isServer) {
      config.resolve.alias['jsdoc/env'] = path.resolve(__dirname, './lib/jsdoc-parser/env')
      config.resolve.alias['jsdoc'] = path.resolve(__dirname, './node_modules/jsdoc/lib/jsdoc')
      config.node = {
        __dirname: false
      }
    }
    return config
  },
}
