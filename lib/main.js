'use babel'

// const dictionaryPattern = /lang\s*=\s*'([^']*)'/im
const wordPattern = /\w[^A-Z_]*/g

export default {
  argumentPattern: null,
  environmentPattern: null,

  provideGrammar () {
    return [{
      grammarScopes: ['source.js', 'embedded.source.js'],
      // getDictionaries: textEditor => {
      //   let dictionaries = []
      //   textEditor.scan(dictionaryPattern, ({match, stop}) => {
      //     dictionaries = match[1].split(/(?:\s,)+/)
      //     stop()
      //   })
      //   return dictionaries
      // },
      checkedScopes: {
        'source.js': false,
        'embedded.source.js': false,
        'comment.block.js': true,
        'comment.line.double-slash.js': true,
        'punctuation.definition.string.begin.js': false,
        'punctuation.definition.string.end.js': false,
        'string.quoted.double.js': true,
        'string.quoted.single.js': true,
        'constant.other.js': true,
        'entity.name.function.js': true,
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
