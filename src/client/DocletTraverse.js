const EventEmitter = require('events').EventEmitter

const PREFIX = 'type-'

class DocletTraverse extends EventEmitter {
  constructor(doclets, context) {
    super()
    context.result.push(...JSON.parse(JSON.stringify(doclets)).filter(this._filter))
    this._doclets = context.result
    this._index = 0
    this._map = context.map || {}
    this._listenerKey = []
  }

  _filter(doclet) {
    return !doclet.undocumented
  }

  next() {
    const doclet = this._doclets[this._index]
    if (typeof doclet === 'undefined') {
      throw Error('Doclet not found.')
    }
    const done = this._index >= this._doclets.length - 1
    const value = {
      doclet,
      done,
    }
    this._index += 1
    return value
  }

  _shouldBeIgnored(name) {
    const pattern = '^[\"\'].*[\"\']$' + '|'
      + '^string$' + '|'
      + '^number$' + '|'
      + '^boolean$' + '|'
      + '^object$' + '|'
      + '^function$'

    return new RegExp(pattern, 'i').test(name)
  }

  _handleFindDoclet(doclet) {
    if (!doclet.longname) return
    this._map[doclet.longname] = doclet
    this.emit(`${PREFIX}${doclet.longname}`, doclet)
  }

  _handleTraverseProperty(doclets) {
    const context = {
      result: [],
      map: this._map,
    }
    new this.constructor(doclets, context).run()
    return context.result
  }

  _checkAllCustomTypeFound() {
    if (!this._listenerKey.length) return
    const typeNotFound = []
    this._listenerKey.forEach(key => {
      if (this.listeners(key).length) {
        typeNotFound.push(key.replace(PREFIX, ''))
      }
    })
    if (typeNotFound.length) {
      throw Error(`Type not found: [${typeNotFound.join(', ')}]`)
    }
  }

  run({check = true} = {}) {
    while(true) {
      const value = this.next()
      if (value.doclet.undocumented) {
        continue
      }
      if (value.doclet.type && Array.isArray(value.doclet.type.names)) {
        value.doclet.type.names.forEach((name, index) => {
          if (this._shouldBeIgnored(name)) return
          if (!this._map[name]) {
            const key = `type-${name}`
            if (!~this._listenerKey.indexOf(key)) {
              this._listenerKey.push(key)
            }
            this.once(key, (doclet) => {
              value.doclet.type.names[index] = doclet
            })
          } else {
            value.doclet.type.names[index] = this._map[name]
          }
        })
      }
      if (value.doclet.properties) {
        value.doclet.properties = this._handleTraverseProperty(value.doclet.properties)
      }
      this._handleFindDoclet(value.doclet)
      if (value.done) break
    }
    if (check) {
      this._checkAllCustomTypeFound()
    }
    return this._doclets
  }
}

module.exports = DocletTraverse
