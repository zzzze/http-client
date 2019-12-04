const utils = require('../utils')

const traverseProperties = (obj) => {
  const { name, properties } = obj
  const map = {}

  properties.forEach(property => {
    utils.setAttr(map, property.name, {__value__: property})
  })
  return map
}

module.exports = traverseProperties
