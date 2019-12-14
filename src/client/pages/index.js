import React from 'react'
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Link from 'next/link'
import axios from 'axios'

const sortTypes = names => {
  const result = []
  const enumType = []

  names.forEach(name => {
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

let Type

const Input = ({property}) => {
  let names = []
  const [explodeProp, setExplodeProp] = React.useState(false)
  const [selectedName, setSelectedName] = React.useState(0)
  if (property.type && property.type.names) {
    names = sortTypes(property.type.names)
  }
  console.log('names', names)
  if (!names[selectedName]) return null
  const name = names[selectedName]
  const renderContent = () => {
    if (Array.isArray(name)) {
      return (
        <div>
          {property.name} :
          <select>
            {name.map(item => {
              // item = item.replace(/^['"]|['"]$/g, '')
              return <option value={item}>{item}</option>
            })}
          </select>
        </div>
      )
    }
    if (name === 'string' || name === 'number') {
      return (
        <div>
          {property.name} :
          <input value={property.name}/>
        </div>
      )
    }
    if (name === 'boolean') {
      return <div>
        {property.name} :
        <select>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
      </div>
    }
    if (!!name.properties) {
      return (
        <>
          <div>
            {property.name} :
            <Switch
              checked={explodeProp}
              onChange={() => {console.log(explodeProp); setExplodeProp(!explodeProp)}}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
          <Type data={name} withoutTitle explodeProp={explodeProp}></Type>
        </>
      )
    }
    if (name === 'object') {
      return <div>
        {property.name} :
        <textarea id="" name="" cols="30" rows="10">{name}</textarea>
      </div>
    }
  }
  return <div>
    {names.length > 1 && <Select
      value={selectedName}
      onChange={event => setSelectedName(event.target.value)}
    >
      {names.map((name, index) => {
        console.log('name zxx', name, Array.isArray(name))
        return <MenuItem value={index}>{Array.isArray(name) ? 'Enum' : name}</MenuItem>
      })}
    </Select>}
    
    {renderContent()}
  </div>
}

Type = ({data, withoutTitle, explodeProp: explodePropFromParent}) => {
  const [explodeProp, setExplodeProp] = React.useState(explodePropFromParent)
  React.useEffect(() => {
    if (data.properties) {
      setExplodeProp(true)
    }
  }, [])
  React.useEffect(() => {
    setExplodeProp(explodePropFromParent)
  }, [explodePropFromParent])
  if (!!data.properties) {
    return (
      <>
      {!withoutTitle && <div>
          aaa {data.name}
          <Switch
            checked={explodeProp}
            onChange={() => {console.log(explodeProp); setExplodeProp(!explodeProp)}}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>}
        <div>
          {!!explodeProp ? (
            data.properties.map(property => {
              console.log('aaa', property.name)
              return (
                <Type data={property} />
              )
            })
          ) : (
            <textarea id="" name="" cols="30" rows="10">{data.name}</textarea>
          )}
        </div>
      </>
    )
  } else {
    return <><Input property={data} /></>
  }
}

const Index = (props) => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
    <div>{props.data.description}</div>
    <Type data={props.data} explodeProp></Type>
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
