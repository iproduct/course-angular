var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

// Merge dev and common configs
module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',  // necessary for HMR to know where to load the hot update chunks
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[id].css"
    }),
    new webpack.NamedModulesPlugin() // Enable named module updates with React HMR
  ],

  devServer: {
    contentBase: helpers.root('dist'), // match the output path
    publicPath: '/', // match the output `publicPath`
    historyApiFallback: true, // HTML 5 History API support
    stats: 'minimal', // Minimal statistics
    proxy: {
            '/api/*': {
                target: 'http://localhost:9000/',
                secure: false
            }
        },
  }
});
