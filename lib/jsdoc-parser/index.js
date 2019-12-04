const moduleAlias = require('module-alias')
moduleAlias.addAlias('jsdoc', 'jsdoc/lib/jsdoc')
moduleAlias.addAlias('jsdoc/env', __dirname + '/env')
const Parser = require('jsdoc/src/parser').Parser
const handler = require('jsdoc/src/handlers')

module.exports = {
  createJsdocParser() {
    const parser = new Parser
    handler.attachTo(parser)
    return parser
  }
}
