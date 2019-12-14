import React from 'react'
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

let Type

const renderInput = (property) => {
  let names = property.type.names
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
      return <Type data={property}></Type>
    }
    if (name.properties) {
      return <Type data={name}></Type>
    }
  })
}

const Checkbox = ({value, children, onChange}) => {
  return (
    <div>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          checked: child.props.value === value,
          onChange,
        })
      })}
    </div>
  )
}

const CheckboxOption = ({value, checked, onChange}) =>  {
  const handleChange = React.useCallback(() => {
    onChange(value)
  })
  return (
    <>
      <div className={checked ? 'option checked' : 'option'} onClick={handleChange}></div>
      <style jsx>{`
        .option {
          width: 20px;
          height: 20px;
          border: 1px solid #333;
          background: #fff;
        }
        .option.checked {
          border-color: blue;
          background: blue;
        }
      `}</style>
    </>
  )
}

Type = ({data}) => {
  const [explodeProp, setExplodeProp] = React.useState(false)
  React.useEffect(() => {
    if (data.properties) {
      setExplodeProp(true)
    }
  }, [])
  return (
    <div>
      {/* {data.properties} */}
      {!!data.properties && (
        <Checkbox value={explodeProp} onChange={(value) => {console.log('value', value); setExplodeProp(value)}}>
          <CheckboxOption value={true} ></CheckboxOption>
          <CheckboxOption value={false} ></CheckboxOption>
        </Checkbox>
      )}
      { explodeProp ? data.properties.map(property => {
        return (
          <div>{property.name}: {renderInput(property)}</div>
        )
      }): <textarea id="" name="" cols="30" rows="10"></textarea>}
    </div>
  )
}

const Index = (props) => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
    <div>{props.data.description}</div>
    <Type data={props.data}></Type>
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
