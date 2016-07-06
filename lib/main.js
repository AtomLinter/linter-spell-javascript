'use babel'

// const dictionaryPattern = /lang\s*=\s*'([^']*)'/im
const wordPattern = /\w[^A-Z_]*/g

export default {
  argumentPattern: null,
  environmentPattern: null,

  provideGrammar () {
    return [{
      grammarScopes: ['source.js'],
      // getDictionaries: textEditor => {
      //   let dictionaries = []
      //   textEditor.scan(dictionaryPattern, ({match, stop}) => {
      //     dictionaries = match[1].split(/(?:\s,)+/)
      //     stop()
      //   })
      //   return dictionaries
      // },
      checkedScopes: {
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
      getRanges: (textEditor, ranges) => {
        console.log(ranges)
        let newRanges = []
        for (const searchRange of ranges) {
          console.log(searchRange)
          textEditor.scanInBufferRange(wordPattern, searchRange, ({range}) => {
            newRanges.push(range)
          })
        }
        console.log(newRanges)
        return {
          ranges: newRanges
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
