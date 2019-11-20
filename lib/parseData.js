module.exports = function parseData(value, previous) {
  if (value.startsWith('{')) {
    try {
      return {
        ...previous,
        ...JSON.parse(value),
      }
    } catch (e) {
      console.error(`"${value}" is invalid JSON string.`)
    }
  }

  const breakPointIndex = value.indexOf(':')
  if (!~breakPointIndex) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  const key = value.slice(0, breakPointIndex)
  const data = value.slice(breakPointIndex + 1)
  let parsedValue = ''
  try {
    parsedValue = {
      [key]: JSON.parse(data),
    }
  } catch (e) {
    parsedValue = {
      [key]: data,
    }
  }

  return {
    ...previous,
    ...parsedValue,
  }
}
