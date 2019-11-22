const runRequest = require('./runRequest')
const runTest = require('./runTest')

module.exports = function runSubCommand(command, program) {
  switch (command) {
    case 'test':
      return runTest(program)
    default:
      console.log(`send2 ${command}`)
  }
}
