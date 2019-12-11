import Link from 'next/link'
import axios from 'axios'

const sortTypes = names => {
  const result = []
  const enumType = []

  names.forEach(name => {
    console.log(name)
    if (/^['"].*['"]$/.test(name) ||
      /^\d+$/.test(name) ||
      /^(true|false)$/.test(name)) {
      enumType.push(name.replace(/^'|'$/g, '"'))
      // enumType.push(name)
    } else {
      result.push(name)
    }
  })
  if (enumType.length) {
    result.push(enumType)
  }
  return result
}

// const isEnum = names => {
//   return names.every(name => {
//     return /^['"].*['"]$/.test(name) ||
//       /^\d+$/.test(name) ||
//       /^(true|false)$/.test(name)
//   })
// }
let renderType 

const renderInput = (names) => {
  names = sortTypes(names)
  return names.map(name => {
    if (Array.isArray(name)) {
      return (
        <select>
          {name.map(item => {
            // item = item.replace(/^['"]|['"]$/g, '')
            return <option value={item}>{item}</option>
          })}
        </select>
      )
    }
    if (name === 'string' || name === 'number') {
      return <input />
    }
    if (name === 'boolean') {
      return <select>
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
    }
    if (name === 'object') {
      return <textarea id="" name="" cols="30" rows="10"></textarea>
    }
    if (name.properties) {
      return renderType(name)
    }
  })
}

renderType = type => {
  return type.properties.map(property => {
    return (
      <div>{property.name}: {renderInput(property.type.names)}</div>
    )
  })
}

const Index = (props) => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
    <div>{props.data.description}</div>
    {renderType(props.data)}
    <pre>{JSON.stringify(props.data, null, '   ')}</pre>
  </div>
)

Index.getInitialProps = async () => {
  const res = await axios.get('http://localhost:3000/api/doclet')
  return {
    data: res.data,
  }
}

export default Index
