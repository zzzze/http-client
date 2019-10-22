#!/usr/bin/env node
const request = require('../lib/client')
const argv = require('minimist')(process.argv.slice(2))

const configName = argv._[0]
const env = { ...argv }
delete env._

request(configName, env)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
