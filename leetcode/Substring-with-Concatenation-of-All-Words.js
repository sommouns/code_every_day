function main(s, words) {
  var mapObj = {},
    res = []
  let sortWords = (words, str = '') => {
    for (let key = 0; key < words.length; key++) {
      if (words.length === 1) {
        return (mapObj[words[key] + '' + str] = 1)
      }
      var copy = [].concat(words)
      copy.splice(key, 1)
      sortWords(copy, str + words[key])
    }
  }

  sortWords(words)

  const WINDOW_LENGTH = words.length * words[0].length

  for (let i = 0; i < s.length - WINDOW_LENGTH; i++) {
    var window = s.slice(i, i + WINDOW_LENGTH)
    if (mapObj[window]) {
      res.push(i)
    }
  }

  return res
}
let res = main('barfoothefoobarman', ['foo', 'bar'])
