'use babel'

import { CompositeDisposable } from 'atom'

// const dictionaryPattern = /lang\s*=\s*'([^']*)'/im
const wordPattern = /\w[^A-Z_]*/g
const grammarScopes = [
  'source.js',
  'source.js.jsx',           // language-babel
  'source.embedded.js',      // language-asciidoc, language-gfm
  'source.js.embedded.html', // language-html
  'embedded.source.js',      // language-markdown
  'source.json',             // language-json
]

export default {
  disposables: null,

  provideGrammar () {
    function checkCode () {
      return atom.config.get('linter-spell-javascript.checkCode')
    }
    function checkStrings () {
      return atom.config.get('linter-spell-javascript.checkStrings')
    }
    function checkComments () {
      return atom.config.get('linter-spell-javascript.checkComments')
    }

    return [{
      grammarScopes: grammarScopes,
      checkedScopes: {
        'source.js': checkCode,
        'source.js.jsx': checkCode,
        'source.embedded.js': checkCode,
        'source.js.embedded.html': checkCode,
        'embedded.source.js': checkCode,
        'comment.block.js': checkComments,
        'comment.line.double-slash.js': checkComments,
        'constant.other.js': checkCode,
        'embedded.source.js': checkCode,
        'entity.name.function.js': checkCode,
        'punctuation.definition.string.begin.js': false,
        'punctuation.definition.string.end.js': false,
        'storage.modifier.js': false,
        'storage.type.js': false,
        'string.quoted.double.js': checkStrings,
        'string.quoted.single.js': checkStrings,
        'support.type.object.node.js': false,
        'variable.other.module.js': checkCode,
        'variable.other.object.js': checkCode,
        'string.quoted.double.json': checkStrings
      },
      filterRanges: (textEditor, ranges) => {
        let newRanges = []
        for (const searchRange of ranges) {
          textEditor.scanInBufferRange(wordPattern, searchRange, ({range}) => {
            newRanges.push(range)
          })
        }
        return {
          ranges: newRanges,
          ignoredRanges: []
        }
      }
    }]
  },

  provideDictionary () {
    let wordList = require('linter-spell-word-list')
    let a = new wordList.ConfigWordList({
      name: 'JavaScript',
      keyPath: 'linter-spell-javascript.words',
      grammarScopes: grammarScopes
    })
    this.disposables.add(a)
    return a.provideDictionary()
  },

  activate () {
    this.disposables = new CompositeDisposable()
    require('atom-package-deps').install('linter-spell-javascript')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
    this.disposables.dispose()
  }
}
