const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  entry: {
    index: './src/index.js',
    polyfill: './src/polyfill.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      join: ['lodash', 'join']
    })
  ],
  module: {
    rules: [
      {
        test: require.resolve('./src/global.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  }
}