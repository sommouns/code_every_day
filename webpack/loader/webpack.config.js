const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  entry: {
    app: './src/index.txt'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'output management'
    })
  ],
  output: {
    filename: '[name].bundle.txt',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, 'loader/l1.js'),
          options: {
            test: 'tim'
          }
        }
      }
    ]
  }
}