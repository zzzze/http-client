module.exports = function genCallback(callback) {
  if (!callback) {
    return 'function (res) { return res.data }'
  }

  if (typeof callback === 'function') {
    return callback.toString()
  }

  if (callback.match(/^\s*function[\s(]/)) {
    return callback
  }

  return `function (res) { return ${callback} }`
}
