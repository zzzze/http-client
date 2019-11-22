const path = require('path')
const request = require('./client')
const { spawnSync } = require('child_process')

module.exports = function runTest(program) {
  return spawnSync(path.resolve(__dirname, '../node_modules/.bin/mocha'), [path.resolve(__dirname, '../lib/test')], {
    stdio: [0, 1, 2],
    detached: true,
    env: {
      ...process.env,
      BASE_CONFIG: program.baseConfig || '',
    },
  })
}
