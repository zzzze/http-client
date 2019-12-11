import getConfigDoclet from '../../getConfigDoclet'

export default (req, res) => {
  const configDoclet = getConfigDoclet()
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(configDoclet))
}
