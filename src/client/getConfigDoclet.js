const stringifyObject = require('stringify-object')
const path = require('path')
const jsdocParser = require('../../lib/jsdoc-parser')
const parser = jsdocParser.createJsdocParser()
const formatProperties = require('./formatProperties')
const DocletTraverse = require('./DocletTraverse')

const jsdocAST = parser.parse([
  path.resolve(process.env.PWD, './configs/cloud-function/local/config.base.js'),
  path.resolve(__dirname, '../../lib/types.js'),
])

module.exports = () => {
  const context = {
    result: [],
    map: {},
  }
  new DocletTraverse(jsdocAST, context).run()

  const configDoclet = context.result.reduce((result, doclet) => {
    if (doclet.longname === 'Config') {
      result = JSON.parse(JSON.stringify(doclet))
      if (result.properties) {
        result.properties = formatProperties(doclet.properties)
      }
    }
    return result
  }, null)

  return configDoclet
}
