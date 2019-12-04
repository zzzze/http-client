const stringifyObject = require('stringify-object')
const EventEmitter = require('events').EventEmitter
const path = require('path')
const jsdocParser = require('../../lib/jsdoc-parser')
const parser = jsdocParser.createJsdocParser()
const traverseProperties = require('./traverseProperties')


// console.log(stringifyObject(parser.parse(['./configs/cloud-function/local/config.base.js'])))

const jsdocAST = parser.parse([
  path.resolve(__dirname, '../../lib/types.js'),
  path.resolve(process.env.PWD, './configs/cloud-function/local/config.base.js'),
])
// console.log(JSON.stringify(parser.parse(['./lib/types.js', './configs/cloud-function/local/config.base.js'])))

const traverse = (jsdocAST, context, callback) => {
  const docletMap = {}
  jsdocAST.forEach(doclet => {
    // if (!doclet.undocumented && doclet.scope === 'global') {
    if (!doclet.undocumented) {
      docletMap[doclet.longname] = {
        name: doclet.name,
        longname: doclet.longname,
        type: doclet.type,
      }
      if (doclet.properties) {
        docletMap[doclet.longname].properties = traverseProperties(doclet)
      }
    }
    callback(doclet)
  })
  context.comments = docletMap
  console.log(JSON.stringify(docletMap))
}


const context = {}

module.exports = () => new Promise(resolve => {
  traverse(jsdocAST, context, (doclet) => {
    console.log(JSON.stringify(doclet.comment))
    resolve(context)
  })
})
