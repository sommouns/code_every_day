const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/dynamic.js',
    // another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "code spliting"
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
}