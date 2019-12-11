// const moduleAlias = __non_webpack_require__('module-alias')
// moduleAlias.addAlias('jsdoc', 'jsdoc/lib/jsdoc')
// moduleAlias.addAlias('jsdoc/env', process.env.PWD + '/lib/jsdoc-parser/env')
// console.log(process.env.PWD)
// console.log('__dirname', __dirname)
// const Parser = __non_webpack_require__('jsdoc/src/parser').Parser
// const handler = __non_webpack_require__('jsdoc/src/handlers')
const Parser = require('jsdoc/src/parser').Parser
const handler = require('jsdoc/src/handlers')
console.log(Parser)

module.exports = {
  createJsdocParser() {
    const parser = new Parser
    handler.attachTo(parser)
    return parser
  }
}
