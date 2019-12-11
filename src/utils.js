const merge = require('deepmerge')
const splitAttrPath = attrPath => {
  return attrPath.replace(/([\[\]])/g, (match, p1) => {
    if (p1 == '[') return '.'
    if (p1 == ']') return ''
  }).split('.')
}

const getAttr = (obj, attrPath) => {
  const attrPathArray = !Array.isArray(attrPath)
    ? splitAttrPath(attrPath)
    : attrPath
  return attrPathArray.reduce((result, attr, index) => {
    if (typeof obj[attr] === 'undefined') {
      obj[attr] = {}
    }
    result = obj[attr]
    obj = obj[attr]
    return result
  }, null)
}

const setAttr = (obj, attrPath, value) => {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    Object.assign(getAttr(obj, attrPath), value)
  } else {
    let attrPathArray = splitAttrPath(attrPath)
    let lastAttr = attrPathArray.pop()
    if (!attrPathArray.length) {
      obj[lastAttr] = value
    } else {
      getAttr(obj, attrPathArray)[lastAttr] = value
    }
  }
  return obj
}

const setAttrV2 = (properties) => {
  const result = {}
  return merge.all(properties.map(property => {
    const keys = property.name.split('.')

    let result_1 = {}
    keys.reverse().forEach((key, index) => {
      if (index === 0) {
        result_1 = {
          [key]: {
            ...property,
            name: key,
          }
        }
      } else {
        result_1 = {
          [key]: {properties: result_1}
        }
      }
    })
    return result_1
  }))
}

const mapPropertyObjToArr = (propertyObj, handler) => {
  const obj = propertyObj
  console.log(obj)
  const trans = (_obj) => {
    let copy = JSON.parse(JSON.stringify(_obj))
    if (Array.isArray(copy)) {
      return copy.map(item => trans(item))
    }
    if (typeof copy === 'string' || typeof copy === 'boolean' || typeof copy === 'number') {
      return copy
    }
    const keys = Object.getOwnPropertyNames(copy)
    if (!copy || !keys.length) return copy
    copy = keys.reduce((result, key) => {
      if (key !== 'properties') {
        result[key] = trans(copy[key])
      } else {
        result[key] = handler(copy[key], trans) // Object.values(copy[key]).map(item => trans(item))
      }
      return result
    }, {})

    return copy
  }
  return trans(obj)
}


module.exports = {
  getAttr,
  setAttr,
  setAttrV2,
  mapPropertyObjToArr,
}
