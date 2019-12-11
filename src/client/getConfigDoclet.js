const stringifyObject = require('stringify-object')
const path = require('path')
const jsdocParser = require('../../lib/jsdoc-parser')
const parser = jsdocParser.createJsdocParser()
const formatProperties = require('./formatProperties')
const DocletTraverse = require('./DocletTraverse')
const utils = require('../utils')

const jsdocAST = parser.parse([
  path.resolve(process.env.PWD, './configs/cloud-function/local/config.base.js'),
  './lib/types.js',
])

module.exports = () => {
  const context = {
    result: [],
    map: {},
  }
  new DocletTraverse(jsdocAST, context).run()

  // // return context.result
  //
  // const _formatProperties = (properties) => {
  //   // properties = properties.map(item => {
  //   //   if (item.properties) {
  //   //     return _formatProperties(item.properties)
  //   //   } else {
  //   //     return item
  //   //   }
  //   // })
  //   properties = formatProperties(properties)
  //   const result = {}
  //   Object.keys(properties).forEach(key => {
  //     if (properties.hasOwnProperty(key)) {
  //       console.log(key)
  //       result[key] = {properties: {}}
  //       Object.assign(result[key], properties[key].__value__)
  //       delete properties[key].__value__
  //       Object.assign(result[key].properties, properties[key])
  //     }
  //   })
  //   return result
  // }
  //
  // context.result.forEach((doclet) => {
  //   if (doclet.properties) {
  //     // doclet.properties = _formatProperties(doclet.properties)
  //   }
  // })

  let configDoclet = context.result.find(doclet => doclet.name === 'Config')
  let result = utils.mapPropertyObjToArr(configDoclet, (value, trans) => {
    console.log(value)
    return utils.setAttrV2(value.map(item => {console.log('item -----', item); return trans(item)}))
  })
  return utils.mapPropertyObjToArr(result, (obj, trans) => Object.values(obj).map(item => trans(item)))
  configDoclet = {
    ...configDoclet,
    properties: utils.mapPropertyObjToArr(utils.setAttrV2(configDoclet.properties))
  }
  return configDoclet
}
