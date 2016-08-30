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
    function checkComments () {
      return atom.config.get('linter-spell-javascript.checkComments')
    }

    return [{
      grammarScopes: grammarScopes,
      checkedScopes: {
        'source.js': true,
        'source.js.jsx': true,
        'source.embedded.js': true,
        'source.js.embedded.html': true,
        'embedded.source.js': true,
        'comment.block.js': checkComments,
        'comment.line.double-slash.js': checkComments,
        'constant.other.js': true,
        'embedded.source.js': true,
        'entity.name.function.js': true,
        'punctuation.definition.string.begin.js': false,
        'punctuation.definition.string.end.js': false,
        'storage.modifier.js': false,
        'storage.type.js': false,
        'string.quoted.double.js': true,
        'string.quoted.single.js': true,
        'support.type.object.node.js': false,
        'variable.other.module.js': true,
        'variable.other.object.js': true,
        'string.quoted.double.json': true
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
