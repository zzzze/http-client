module.exports = function parseHeader(value, previous) {
  const breakPointIndex = value.indexOf(':')
  if (!~breakPointIndex) {
    console.error('Invalid header format.')
    return {...previous}
  }
  const headerKey = value.slice(0, breakPointIndex)
  const headerValue = value.slice(breakPointIndex + 1)
  return {
    ...previous,
    [headerKey]: headerValue,
  }
}
