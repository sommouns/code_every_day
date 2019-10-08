const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HelloWorldPlugin = require('./my-plugin.js')
module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'output management'
    }),
    new HelloWorldPlugin({
      options: true
    })
  ],
  output: {
    filename: '[name].bundle.txt',
    path: path.join(__dirname, 'dist')
  }
}