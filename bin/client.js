#!/usr/bin/env node
const path = require('path')
const program = require('commander')
const request = require('../lib/client')
const parseData = require('../lib/parseData')
const parseHeader = require('../lib/parseHeader')

const subCommand = [
  'help',
  // 'configs',
]

program
  .usage('[url] [options] | send2 [command] [options]')
  .version('0.0.3')
  .description('Transfer data from or to a server.')
  .option('-K, --config <path>', 'Specify a JavaScript file to read arguments from.')
  .option('-X, --request <method>', 'Specify a custom request method to use when communicating with the server.')
  .option('--method <method>', 'Specify a custom request method to use when communicating with the server.')
  .option('-d, --data <data>', 'Send the specified data to the server.', parseData)
  .option('-H, --header <header>', 'Extra header to include in the request when sending to a server.', parseHeader, {})
  .option('--url <url>', 'Specify a URL to fetch.')
  .option('--callback <script>', 'Scripts run after fetch success.')
  .option('--env <env>', 'Env.', parseData, {})
  .option('--json-string', 'Return data in JSON string format.')
  .option('--base-config', 'Specify a base config file.')
// .option('-o, --output <file>', 'Write to file instead of stdout.')
  .on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('  $ send2 http://test.com')
    console.log('  $ send2 -K ./configs/fetch-data.js')
    console.log('  $ send2 --data "{\"a\": 10, \"b\": 20}"')
  })
// .command('configs', 'Get final configs', {executableFile: 'configs'})
  .parse(process.argv)

if (!subCommand.includes(process.argv[2])) {
  const config = (function getConfigFromCommandLine(config) {
    const result = {}
    Object.keys(config).forEach(function (key) {
      if (typeof config[key] !== 'undefined') {
        result[key] = config[key]
      }
    })
    return result
  })({
    data: program.data,
    url: program.url || program.args[0],
    headers: program.header,
    method: program.request || program.method,
  })

  const configFileName = program.config && path.join(process.env.PWD, program.config)
  request({
    config,
    configFileName,
    env: program.env,
    baseConfig: program.baseConfig,
    callback: program.callback,
  }).then(res => console.log(program.jsonString ? JSON.stringify(res) : res))
}
