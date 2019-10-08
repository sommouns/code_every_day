function MyExamplePlugin() {
  
}
MyExamplePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function (compilation, callback) {
    console.log('hello world')
  })
}
module.exports = MyExamplePlugin