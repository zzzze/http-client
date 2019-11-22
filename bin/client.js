#!/usr/bin/env node
const path = require('path')
const program = require('commander')
const request = require('../lib/client')
const parseData = require('../lib/parseData')
const parseHeader = require('../lib/parseHeader')
const runSubCommand = require('../lib/runSubCommand')
const runRequest = require('../lib/runRequest')
const pkg = require('../package.json')

const subCommand = [
  'help',
  'test',
  // 'configs',
]

program
  .usage('[url] [options] | send2 [command] [options]')
  .version(pkg.version)
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
  .option('--base-config <baseConfig>', 'Specify a base config file.')
  // .option('-o, --output <file>', 'Write to file instead of stdout.')
  .on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('  $ send2 http://test.com')
    console.log('  $ send2 -K ./configs/fetch-data.js')
    console.log('  $ send2 --data "{\"a\": 10, \"b\": 20}"')
  })
  .command('test [options]', 'Run test.', {executableFile: 'test'})
  // .command('configs', 'Get final configs', {executableFile: 'configs'})
  .action(runSubCommand)
  .parse(process.argv)

if (!subCommand.includes(process.argv[2])) {
  runRequest(program)
}
