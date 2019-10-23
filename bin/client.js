#!/usr/bin/env node
const path = require('path')
const request = require('../lib/client')
const argv = require('minimist')(process.argv.slice(2))

const configName = argv['c'] || argv['config']
const callback = argv['callback']
  ? function (res) {
    eval(argv['callback'])
  }
  : function (res) {
    console.log(res.data)
  }
const env = { ...argv }
delete env._

const configFilePathname = path.join(process.env.PWD, configName)
request(configFilePathname, env)
  .then(res => callback(res))
  .catch(err => console.log(err))
