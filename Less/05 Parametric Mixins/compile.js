const fs = require('fs')
const path = require('path')
var less = require('less');

fs.readFile(path.resolve(__dirname, 'libs/style.less'), function (err, data) {
  console.log(data.toString())
  less.render(data.toString(),
    {
      paths: ['.', '`.`/lib', path.resolve(__dirname, 'libs/')],  // Specify search paths for @import directives
      filename: 'style.less', // Specify a filename, for better error messages
      compress: false          // Minify CSS output
    },
    function (e, output) {
      try {
        fs.writeFile(path.resolve(__dirname, 'libs/style.css'), output.css, function (err) {
          console.log(err, data)
        })
      } catch (err) {
        console.log(e, err)
      }
      
    });
})

