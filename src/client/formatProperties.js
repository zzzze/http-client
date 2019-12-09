const utils = require('../utils')

const formatProperties = (properties) => {
  const obj = {}

  properties.forEach(property => {
    utils.setAttr(obj, property.name, {__value__: property})
  })
  return obj
}

module.exports = formatProperties
