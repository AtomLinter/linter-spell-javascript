'use babel'

// const dictionaryPattern = /lang\s*=\s*'([^']*)'/im
const wordPattern = /\w[^A-Z_]*/g

export default {
  argumentPattern: null,
  environmentPattern: null,

  provideGrammar () {
    function checkComments () {
      return atom.config.get('linter-spell-javascript.checkComments')
    }

    return [{
      grammarScopes: [
        'source.js',
        'source.js.jsx',           // language-babel
        'source.embedded.js',      // language-asciidoc, language-gfm
        'source.js.embedded.html', // language-html
        'embedded.source.js',      // language-markdown
        'source.json',             // language-json
      ],
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

  activate () {
    require('atom-package-deps').install('linter-spell-javascript')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
  }
}
