const EventEmitter = require('events').EventEmitter

const PREFIX = 'type-'

class DocletTraverse {
  constructor(doclets, context) {
    context.result.push(...JSON.parse(JSON.stringify(doclets)).filter(this._filter))
    this._doclets = context.result
    this._index = 0
    this._map = context.map || {}
    this._eventBus = context.eventBus || new EventEmitter
    this._innerEventBus = !context.eventBus
    this._listenerKey = []
  }

  _filter(doclet) {
    return !doclet.undocumented
  }

  _next() {
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
      + '^\\d+$' + '|'
      + '^string$' + '|'
      + '^number$' + '|'
      + '^boolean$' + '|'
      + '^object$' + '|'
      + '^function$'

    return new RegExp(pattern, 'i').test(name)
  }

  _isProperty(doclet) {
    return !doclet.longname
  }

  _handleFindDoclet(doclet) {
    if (this._isProperty(doclet)) return
    this._map[doclet.longname] = doclet
    this._eventBus.emit(`${PREFIX}${doclet.longname}`, doclet)
  }

  _handleTraverseProperty(doclets, check) {
    const context = {
      result: [],
      map: this._map,
      eventBus: this._eventBus,
    }
    new this.constructor(doclets, context, ).run({check})
    return context.result
  }

  _checkAllCustomTypeFound() {
    if (!this._innerEventBus) return
    if (!this._listenerKey.length) return
    const typeNotFound = []
    this._listenerKey.forEach(key => {
      if (this._eventBus.listeners(key).length) {
        typeNotFound.push(key.replace(PREFIX, ''))
      }
    })
    if (typeNotFound.length) {
      throw Error(`Type not found: [ ${typeNotFound.join(', ')} ]`)
    }
  }

  _mergeTypeNames(type, name, doclet) {
    const index = type.names.indexOf(name)
    if (!~index) return
    // console.log(type, doclet.type)
    //
    if (doclet.type && Array.isArray(doclet.type.names)) {
      type.names.splice(index, 1, ...doclet.type.names)
    } else if (doclet.properties) {
      type.names.splice(index, 1, doclet)
    } else { return }

    // 递归合并类型

    if (doclet.type && Array.isArray(doclet.type.names)) {
      const namesForCheck = [].concat(doclet.type.names)
      this._checkAndMergeType(namesForCheck, type)
    }
  }

  _checkAndMergeType(namesForCheck, type) {
    namesForCheck.forEach((name, index) => {
      if (this._shouldBeIgnored(name)) return
      if (!this._map[name]) {
        const key = `${PREFIX}${name}`
        if (!~this._listenerKey.indexOf(key)) {
          this._listenerKey.push(key)
        }
        this._eventBus.once(key, (doclet) => {
          this._mergeTypeNames(type, name, doclet)
        })
      } else {
        this._mergeTypeNames(type, name, this._map[name])
      }
    })

  }

  run({check = true} = {}) {
    while(true) {
      const value = this._next()
      if (value.doclet.undocumented) {
        continue
      }
      if (value.doclet.type && Array.isArray(value.doclet.type.names)) {
        const namesForCheck = [].concat(value.doclet.type.names)
        this._checkAndMergeType(namesForCheck, value.doclet.type)
      }
      if (value.doclet.properties) {
        value.doclet.properties = this._handleTraverseProperty(value.doclet.properties, check)
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
