#!/usr/bin/env node
const path = require('path')
const program = require('commander')
const request = require('../lib/client')

let argv = process.argv.reduce((result, item) => {
  if (item !== '[object Object]') {
    result.push(item)
  }
  return result
}, [])

program
  .description('Get final configs')
  .option('--json-string', 'Return data in JSON string format.')
  .option('-o, --output <file>', 'Write to file instead of stdout.')
  .on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('  $ send2 configs')
    console.log('  $ send2 configs -K ./configs/fetch-data.js')
  })
  .parse(argv)
