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


module.exports = {
  getAttr,
  setAttr,
}
