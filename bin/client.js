#!/usr/bin/env node
const path = require('path')
const program = require('commander')
const request = require('../lib/client')

program
  .usage('[<url>] [Options...]')
  .version('0.0.3')
  .description('Transfer data from or to a server.')
  .option('-K, --config <path>', 'Specify a JavaScript file to read arguments from.')
  .option('-X, --request <method>, --method <method>', 'Specify a custom request method to use when communicating with the server.')
  .option('--method <method>', 'Specify a custom request method to use when communicating with the server.')
  .option('-d, --data <data>', 'Send the specified data to the server.')
  .option('-H, --header <header>', 'Extra header to include in the request when sending to a server.')
  .option('--url <url>', 'Specify a URL to fetch.')
  .option('--callback <script>', 'Scripts run after fetch success.')
  .option('--env <env>', 'Env.')
  .option('--only-configs', 'Only return final configs.')
  .option('--json-string', 'Return data in JSON string format.')
  .option('-o, --output <file>', 'Write to file instead of stdout.')
  .on('--help', function () {
    console.log('')
    console.log('Examples:');
    console.log('  $ send2 http://***');
    console.log('  $ send2 -K ./**/**.js');
  })
  .parse(process.argv)

// console.log(program.opts())

function getConfigFromCommandLine(config) {
  const result = {}
  Object.keys(config).forEach(function (key) {
    if (typeof config[key] !== 'undefined') {
      result[key] = config[key]
    }
  })
  return result
}

const config = getConfigFromCommandLine({
  data: program.data,
  url: program.url || program.args[0],
  headers: program.header,
  method: program.request || program.method,
})

let callback = function (res) {
  console.log(program.jsonString ? JSON.stringify(res.data) : res.data)
}
if (program.callback) {
  eval(`callback = ${program.callback}`)
}

const configFileName = path.join(process.env.PWD, program.config)
request(config, configFileName, {
  env: program.env,
  returnConfigs: program.returnFinalConfigs,
  callback,
  jsonString: program.jsonString,
})
