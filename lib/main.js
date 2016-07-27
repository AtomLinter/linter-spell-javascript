'use babel'

// const dictionaryPattern = /lang\s*=\s*'([^']*)'/im
const wordPattern = /\w[^A-Z_]*/g

export default {
  argumentPattern: null,
  environmentPattern: null,

  provideGrammar () {
    return [{
      grammarScopes: [
        'source.js',
        'source.embedded.js',      // language-asciidoc, language-gfm
        'source.js.embedded.html', // language-html
        'embedded.source.js'       // language-markdown
      ],
      checkedScopes: {
        'source.js': false,
        'embedded.source.js': false,
        'comment.block.js': true,
        'comment.line.double-slash.js': true,
        'constant.other.js': true,
        'embedded.source.js': true,
        'entity.name.function.js': true,
        'punctuation.definition.string.begin.js': false,
        'punctuation.definition.string.end.js': false,
        'source.embedded.js': true,
        'source.js': true,
        'storage.modifier.js': false,
        'string.quoted.double.js': true,
        'string.quoted.single.js': true,
        'variable.other.module.js': true,
        'variable.other.object.js': true
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

  activate () {
    require('atom-package-deps').install('linter-spell-javascript')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
  }
}
